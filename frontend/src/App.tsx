import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

// pages
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import DashboardPage from "./pages/DashboardPage";
import CoursesPage from "./pages/CoursesPage";
import ProfilePage from "./pages/ProfilePage";
import InterviewPrepPage from "./pages/InterviewPrepPage";
import CompanyPage from "./pages/CompanyPage";
import ExercisesPage from "./pages/ExercisesPage";
import ChallengePage from "./pages/ChallengePage";
import LanguageSelectPage from "./pages/LanguageSelectPage";

// instructor pages
import InstructorSignUpPage from "./pages/InstructorSignUpPage";
import InstructorDashboard from "./pages/InstructorDashboard";
import InstructorProfilePage from "./pages/InstructorProfilePage";
import MyCoursesPage from "./pages/MyCoursesPage";
import UploadCoursePage from "./pages/UploadCoursePage";
import EnrollmentsPage from "./pages/EnrollmentsPage";
import StatsPage from "./pages/StatsPage";
import CourseDetailPage from "./pages/CourseDetailPage";

const App: React.FC = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ flex: 1 }}>
        <Routes>

          {/* public */}
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* main user */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/learn" element={<CoursesPage />} />
        <Route path="/courses/:courseId" element={<CourseDetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          {/* Interview Prep → Company list → Exercises */}
          <Route path="/interview-prep" element={<InterviewPrepPage />} />
          <Route path="/interview-prep/:companySlug" element={<CompanyPage />} />
          <Route path="/exercises/:companySlug/:lang" element={<ExercisesPage />} />



          {/* Single challenge view */}
          <Route path="/exercise/:slug" element={<ChallengePage />} />

          {/* quick quiz feature */}
          <Route path="/quiz" element={<LanguageSelectPage />} />

          {/* instructor */}
          <Route path="/instructor-signup" element={<InstructorSignUpPage />} />
          <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
          <Route path="/instructor/profile" element={<InstructorProfilePage />} />
          <Route path="/instructor/my-courses" element={<MyCoursesPage />} />
          <Route path="/instructor/upload" element={<UploadCoursePage />} />
          <Route path="/instructor/enrollments" element={<EnrollmentsPage />} />
          <Route path="/instructor/stats" element={<StatsPage />} />

          {/* catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
