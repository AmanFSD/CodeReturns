from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import subprocess

@api_view(['POST'])
def execute_code(request):
    """
    Accepts Python code and executes it using subprocess (with timeout for safety).
    Only Python is supported in this example.
    """
    code = request.data.get("code")
    language = request.data.get("language")

    if not code or not language:
        return Response({"error": "Code and language are required."}, status=status.HTTP_400_BAD_REQUEST)

    if language.lower() != "python":
        return Response({"error": "Only Python code execution is supported."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        result = subprocess.run(
            ["python3", "-c", code],
            capture_output=True,
            text=True,
            timeout=5,
        )

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