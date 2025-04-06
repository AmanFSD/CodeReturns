from django.shortcuts import render

# Create your views here.
# views.py
import subprocess
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['POST'])
def execute_code(request):
    code = request.data.get("code")
    language = request.data.get("language")

    if not code or language != "python":
        return Response({"error": "Only Python code is supported"}, status=400)

    try:
        result = subprocess.run(
            ["python3", "-c", code],
            capture_output=True,
            text=True,
            timeout=5,
        )
        return Response({"output": result.stdout or result.stderr})
    except subprocess.TimeoutExpired:
        return Response({"error": "Code execution timed out"}, status=400)