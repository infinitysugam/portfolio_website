from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import json
import os
from openai import OpenAI


def load_context():
    """Load the chatbot context from the context folder"""
    context_dir = os.path.join(settings.BASE_DIR, 'chatbot_context')
    
    # Load profile information
    profile_path = os.path.join(context_dir, 'profile.txt')
    with open(profile_path, 'r') as f:
        profile_content = f.read()
    
    # Load system prompt
    system_prompt_path = os.path.join(context_dir, 'system_prompt.txt')
    with open(system_prompt_path, 'r') as f:
        system_prompt = f.read()
    
    return system_prompt, profile_content


@csrf_exempt
def chat(request):
    """Handle chat requests from the frontend"""
    if request.method != 'POST':
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)
    
    try:
        data = json.loads(request.body)
        user_message = data.get('message', '')
        conversation_history = data.get('history', [])
        
        if not user_message:
            return JsonResponse({'error': 'Message is required'}, status=400)
        
        # Check if OpenAI API key is configured
        api_key = settings.OPENAI_API_KEY
        if not api_key:
            return JsonResponse({
                'error': 'OpenAI API key not configured. Please set OPENAI_API_KEY environment variable.'
            }, status=500)
        
        # Load context
        system_prompt, profile_content = load_context()
        
        # Initialize OpenAI client
        client = OpenAI(api_key=api_key)
        
        # Prepare messages for OpenAI
        messages = [
            {
                "role": "system",
                "content": f"{system_prompt}\n\nHere is Sugam's complete profile information:\n\n{profile_content}"
            }
        ]
        
        # Add conversation history
        for msg in conversation_history[-10:]:  # Keep last 10 messages for context
            messages.append({
                "role": msg.get('role', 'user'),
                "content": msg.get('content', '')
            })
        
        # Add current user message
        messages.append({
            "role": "user",
            "content": user_message
        })
        
        # Call OpenAI API
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            temperature=0.7,
            max_tokens=500
        )
        
        assistant_message = response.choices[0].message.content
        
        return JsonResponse({
            'response': assistant_message,
            'success': True
        })
        
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


@csrf_exempt
def text_to_speech(request):
    """Convert text to speech using OpenAI TTS"""
    if request.method != 'POST':
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)
    
    try:
        data = json.loads(request.body)
        text = data.get('text', '')
        
        if not text:
            return JsonResponse({'error': 'Text is required'}, status=400)
        
        # Check if OpenAI API key is configured
        api_key = settings.OPENAI_API_KEY
        if not api_key:
            return JsonResponse({
                'error': 'OpenAI API key not configured'
            }, status=500)
        
        # Initialize OpenAI client
        client = OpenAI(api_key=api_key)
        
        # Generate speech
        response = client.audio.speech.create(
            model="tts-1",
            voice="alloy",
            input=text
        )
        
        # Return audio as base64
        import base64
        audio_data = base64.b64encode(response.content).decode('utf-8')
        
        return JsonResponse({
            'audio': audio_data,
            'success': True
        })
        
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
