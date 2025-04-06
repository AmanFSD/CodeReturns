import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import DashboardPage from "./pages/DashboardPage";
import CoursesPage from "./pages/CoursesPage";
import InterviewPrepPage from "./pages/InterviewPrepPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import ProfilePage from "./pages/ProfilePage";
import ExercisesPage from "./pages/ExercisesPage";
import InstructorSignUpPage from "./pages/InstructorSignUpPage";
import LogoutPage from "./pages/LogoutPage";
import ChallengePage from "./pages/ChallengePage";
import InstructorDashboard from "./pages/InstructorDashboard";
import UploadCoursePage from "./pages/UploadCoursePage";
import InstructorProfilePage from "./pages/InstructorProfilePage";

const App: React.FC = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/learn" element={<CoursesPage />} />
          <Route path="/interview-prep" element={<InterviewPrepPage />} />
          <Route path="/exercise/:slug" element={<ChallengePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/exercises" element={<ExercisesPage />} />
          <Route path="/instructor-signup" element={<InstructorSignUpPage />} />
          <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
          <Route path="/courses/:courseId" element={<CourseDetailPage />} />
                    <Route path="/logout" element={<LogoutPage />} />
                    <Route path="/instructor/profile" element={<InstructorProfilePage />} />
                    <Route path="/instructor/upload" element={<UploadCoursePage />} />
{/* <Route path="/instructor/my-courses" element={<MyCoursesPage />} />
<Route path="/instructor/enrollments" element={<InstructorEnrollments />} />
<Route path="/instructor/stats" element={<InstructorStats />} /> */}
                  </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;