import pytest
from rest_framework.test import APIClient
from django.urls import reverse
from challenges.models import Challenge, Language, Company
from users.models import User
from courses.models import Course, Module


@pytest.mark.django_db
def test_challenge_list_filters():
    client = APIClient()

    # Create a user and course dependency
    user = User.objects.create_user(email='u@e.com', name='U', password='pw')
    lang = Language.objects.create(name='X', slug='x')
    co = Company.objects.create(name='Y', slug='y')
    course = Course.objects.create(title='Test Course', description='Desc', created_by=user)
    module = Module.objects.create(title='M', content='', course=course, order_no=1)

    # Create three matching challenges
    for s in ['a', 'b', 'c']:
        Challenge.objects.create(
            title=s.upper(),
            slug=s,
            description='desc',
            language=lang,
            company=co,
            module=module,
            created_by=user,
        )

    url = reverse('challenge-list')
    response = client.get(url, {'company': co.slug, 'language': lang.slug})

    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) == 3



@pytest.mark.django_db
def test_challenge_detail_by_slug():
    client = APIClient()
    lang = Language.objects.create(name="L", slug="l")
    co   = Company.objects.create(name="C", slug="c")
    user = User.objects.create_user(...)
    mod  = Module.objects.create(...)
    ch   = Challenge.objects.create(
        title="ZZZ", slug="zzz", description="", language=lang,
        company=co, module=mod, created_by=user
    )
    url = reverse('challenge-detail', kwargs={"slug": "zzz"})
    resp = client.get(url)
    assert resp.status_code == 200
    assert resp.data["slug"] == "zzz"


@pytest.mark.django_db
def test_submit_challenge_correct_and_xp_bump():
    client = APIClient()
    lang = Language.objects.create(name="L", slug="l")
    co   = Company.objects.create(name="C", slug="c")
    user = User.objects.create_user(email='a@b.com', name='A', password='pw')
    token= Token.objects.create(user=user)
    mod  = Module.objects.create(...)
    ch   = Challenge.objects.create(
        title="Echo", slug="echo", description="", language=lang,
        company=co, module=mod, expected_output="OK", xp_reward=5, created_by=user
    )

    client.credentials(HTTP_AUTHORIZATION=f"Token {token.key}")
    resp = client.post(f"/api/challenges/echo/submit/", { "code": 'print(\"OK\")', "language": "python" })
    assert resp.status_code == 200
    assert resp.data["correct"] is True
    assert resp.data["xp"] == 5