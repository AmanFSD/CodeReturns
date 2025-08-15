# backend/challenges/tests/test_models.py

from django.test import TestCase
from challenges.models import Language, Company, Challenge
from courses.models import Course, Module
from users.models import User

class ChallengeModelTests(TestCase):
    def setUp(self):
        # create a user
        self.user = User.objects.create_user(
            email='u@e.com', name='U', password='pass'
        )
        # create a Course so Module.course is valid
        self.course = Course.objects.create(
            title="Test Course",
            description="A course for testing",
            created_by=self.user
        )
        # now create a Module pointing at that Course
        self.module = Module.objects.create(
            course=self.course,
            title="M",
            content="",
            order_no=1
        )
        # create Language and Company
        self.lang = Language.objects.create(name="FooLang", slug="foolang")
        self.comp = Company.objects.create(name="FooCo", slug="fooco")

    def test_default_xp_and_expected_output(self):
        # omit xp_reward and expected_output to use model defaults
        c = Challenge.objects.create(
            title="My Challenge",
            description="desc",
            module=self.module,
            language=self.lang,
            company=self.comp,
            created_by=self.user,
        )
        self.assertEqual(c.xp_reward, 10)
        self.assertEqual(c.expected_output, "")