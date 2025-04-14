import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router"; // fixed import source
import App from "./App";

// Public Pages
import HomePage from "./views/homePage.jsx";
import Login from "./views/loginPage.jsx";
import AboutUs from "./views/aboutPage.jsx";
import ContactPage from "./views/contactPage.jsx";
import Subscribe from "./views/subscribePage.jsx";
import PaymentCallback from "./views/paymentCallback.jsx";
import BankAccountForm from "./views/bankForm.jsx";
import PrivacyPolicy from "./views/privacyPolicy.jsx";
import PrivacyPolicyMobile from "./views/mobilePrivacyPolicies.jsx";
import Faq from "./views/faq.jsx";

// Dashboard + Protected Pages
import Dashboard from "./views/dasboard/dashboard.jsx";
import ProtectedRoute from "./views/dasboard/protectedRoute.jsx";
import DashboardHome from "./views/dasboard/dashboardHome.jsx";
import AddFeesPage from "./views/dasboard/addFeeClass.jsx";
import AddClassFeePage from "./views/dasboard/addFee.jsx";
import SelectedFees from "./views/dasboard/selectedFees.jsx";
import ClassFees from "./views/dasboard/classFee.jsx";
import StudentFeeTypeDetails from "./views/dasboard/studentFeeTypeDetails.jsx";
import AddStudent from "./views/dasboard/addStudent.jsx";
import StudentsDetails from "./views/dasboard/studentsDetails.jsx";
import EditStudentDetails from "./views/dasboard/editStudentDetails.jsx";
import EditSchoolDetails from "./views/dasboard/editSchoolDetails.jsx";
import ReportPage from "./views/dasboard/generalReport.jsx";
import ClassRecord from "./views/dasboard/classRecord.jsx";
import ClassDetails from "./views/dasboard/classDetails.jsx";
import UpgradeSubscription from "./views/upgradeSubscription.jsx";

// Context Providers
import { SchoolProvider } from "./context/schoolContext.jsx";
import { StudentProvider } from "./context/studentsContext.jsx";
import UpgradeCallback from "./views/dasboard/verifyAndUpgradeSchool.jsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <SchoolProvider>
    <StudentProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            {/* Public Routes */}
            <Route index element={<HomePage />} />
            <Route path="login" element={<Login />} />
            <Route path="about" element={<AboutUs />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="faq" element={<Faq />} />
            <Route path="subscribe" element={<Subscribe />} />
            <Route path="privacy" element={<PrivacyPolicy />} />
            <Route path="mobilePolicies" element={<PrivacyPolicyMobile />} />
            <Route path="paymentCallback" element={<PaymentCallback />} />
            
            <Route path="bankform" element={<BankAccountForm />} />

            {/* Protected Dashboard Routes */}
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardHome />} />
              <Route path="upgradeSubscription" element={<UpgradeSubscription />} />
              <Route path="upgradeCallback" element={<UpgradeCallback />} />
              <Route path="addFees" element={<AddFeesPage />} />
              <Route path="addFees/addClassFee" element={<AddClassFeePage />} />
              <Route path="addFees/addClassFee/studentDetails" element={<StudentsDetails />} />
              <Route path="addFees/selectedFees" element={<SelectedFees />} />
              <Route path="addFees/selectedFees/classFee" element={<ClassFees />} />
              <Route path="addFees/selectedFees/classFee/student" element={<StudentFeeTypeDetails />} />
              <Route path="addStudent" element={<AddStudent />} />
              <Route path="studentDetails" element={<StudentsDetails />} />
              <Route path="studentDetails/editStudentDetails" element={<EditStudentDetails />} />
              <Route path="editSchool" element={<EditSchoolDetails />} />
              <Route path="generalReport" element={<ReportPage />} />
              <Route path="classRecord" element={<ClassRecord />} />
              <Route path="classRecord/classDetails" element={<ClassDetails />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </StudentProvider>
  </SchoolProvider>
);
