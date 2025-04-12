from .models import Challenge
from .serializers import ChallengeSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import subprocess


@api_view(["GET"])
def get_challenge_detail(request, challenge_id):
    try:
        challenge = Challenge.objects.get(id=challenge_id)
        serializer = ChallengeSerializer(challenge)
        return Response(serializer.data)
    except Challenge.DoesNotExist:
        return Response({"error": "Challenge not found"}, status=404)

@api_view(['POST'])
def execute_code(request):
    code = request.data.get("code")
    language = request.data.get("language")

    if not code or not language:
        return Response({"error": "Code and language are required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        if language.lower() == "python":
            result = subprocess.run(
                ["python3", "-c", code],
                capture_output=True,
                text=True,
                timeout=5,
            )

        elif language.lower() == "javascript":
            result = subprocess.run(
                ["node", "-e", code],
                capture_output=True,
                text=True,
                timeout=5,
            )

        else:
            return Response({"error": "Unsupported language."}, status=status.HTTP_400_BAD_REQUEST)

        output = result.stdout.strip()
        error = result.stderr.strip()

        return Response({
            "output": output if output else None,
            "error": error if error else None
        })

    except subprocess.TimeoutExpired:
        return Response({"error": "Code execution timed out."}, status=status.HTTP_408_REQUEST_TIMEOUT)

    except Exception as e:
        return Response({"error": f"An unexpected error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)