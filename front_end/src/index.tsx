import App from "./App";
import reportWebVitals from "./reportWebVitals";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./Authentication/auth";
import "./index.scss";

import {
  CountryList,
  ViewCountry,
  CountryForm,
} from "./components/GlobalMaster/CountryMasterFC";
import {
  TimeSlotForm,
  TimeSlotList,
  ViewTimeSlot,
} from "./components/GlobalMaster/TimeSlotFC";
import {
  CandidatureList,
  ViewCandidature,
  CandidatureForm,
} from "./components/GlobalMaster/CandidatureTypeMasterFC";

import {
  BloodGroupList,
  ViewBloodGroup,
  BloodGroupForm,
} from "./components/GlobalMaster/BloodGroupMasterFC";

import {
  CommonSubjectList,
  ViewCommonSubject,
  CommonSubjectForm,
} from "./components/GlobalMaster/CommonSubjectMasterFC";

import {
  StateList,
  ViewState,
  StateForm,
} from "./components/GlobalMaster/StateMasterFC";
import {
  EmployeeTypeList,
  ViewEmployeeType,
  EmployeeTypeForm,
} from "./components/GlobalMaster/EmployeeTypeMasterFC";
import {
  MotherTongueList,
  ViewMotherTongue,
  MotherTongueForm,
} from "./components/GlobalMaster/MotherTongueMasterFC";

import {
  DomicileList,
  ViewDomicile,
  DomicileForm,
} from "./components/GlobalMaster/DomicileMasterFC";

import {
  MinorityForm,
  MinorityList,
  ViewMinority,
} from "./components/GlobalMaster/MinorityMasterFC";

import {
  RelationList,
  ViewRelation,
  RelationForm,
} from "./components/GlobalMaster/RelationMasterFC";

import {
  AppointmentTypeList,
  ViewAppointmentType,
  AppointmentTypeForm,
} from "./components/GlobalMaster/AppointmentTypeMasterFC";

import {
  CasteCategoryForm,
  CasteCategoryList,
  ViewCasteCategory,
} from "./components/GlobalMaster/CasteCategoryFC";

import {
  CasteList,
  CasteForm,
  ViewCaste,
} from "./components/GlobalMaster/CasteMasterFC";
import {
  ReligionList,
  ReligionForm,
  ViewReligion,
} from "./components/GlobalMaster/ReligionMasterFC";

import {
  DistrictList,
  DistrictForm,
  ViewDistrict,
} from "./components/GlobalMaster/DistrictMasterFC";

import {
  CourseCategoryForm,
  CourseCategoryList,
  ViewCourseCategory,
} from "./components/GlobalMaster/CourseCategoryMasterFC";
import {
  HandicapTypeForm,
  HandicapTypeList,
  ViewHandicapType,
} from "./components/GlobalMaster/HandicapTypeMasterFC";
import { Provider } from "react-redux";
import { store } from "./store/index";
import {
  TalukaForm,
  TalukaList,
  ViewTaluka,
} from "./components/GlobalMaster/TalukaMasterFC";
import Loader from "./shade/Loaders/Loaders";

import {
  SubCasteForm,
  SubCasteList,
  ViewSubCaste,
} from "./components/GlobalMaster/SubCasteMasterFC";

import {
  BoardList,
  ViewBoard,
  BoardForm,
} from "./components/GlobalMaster/BoardMasterFC";

import {
  AnnualIncomeList,
  ViewAnnualIncome,
  AnnualIncomeForm,
} from "./components/GlobalMaster/AnnualIncomeMasterFC";
import {
  SemesterForm,
  SemesterList,
  ViewSemester,
} from "./components/GlobalMaster/SemesterMasterFC";

import {
  SeatTypeForm,
  SeatTypeList,
  ViewSeatType,
} from "./components/Master/SeatTypeMasterFC";

import {
  CollegeForm,
  CollegeList,
  ViewCollege,
} from "./components/Master/CollegeMasterFC";

import {
  AcademicYearForm,
  AcademicYearList,
  ViewAcademicYear,
} from "./components/Master/AcademicYearMasterFC";

import {
  MinorityDetailsForm,
  MinorityDetailsList,
  ViewMinorityDetails,
} from "./components/GlobalMaster/MinorityDetailsMasterFC";

import {
  EvaluationList,
  EvaluationForm,
  ViewEvaluation,
} from "./components/Master/EvaluationMasterFC";

import {
  AdmissionTypeList,
  AdmissionTypeForm,
  ViewAdmissionType,
} from "./components/Master/AdmissionTypeMasterFC";

import {
  DepartmentList,
  DepartmentForm,
  ViewDepartment,
} from "./components/Master/DepartmentMasterFC";

import {
  ProgramList,
  ProgramForm,
  ViewProgram,
} from "./components/Master/ProgramMasterFC";

import {
  StudyList,
  StudyForm,
  ViewStudy,
} from "./components/Master/StudyMasterFC";

import {
  ProgramTypeList,
  ProgramTypeForm,
  ViewProgramType,
} from "./components/Master/ProgramTypeMasterFC";

import {
  ExamTypeForm,
  ExamTypeList,
  ViewExamType,
} from "./components/Master/ExamTypeMasterFC";

import {
  StreamList,
  StreamForm,
  ViewStream,
} from "./components/Master/StreamMasterFC";

import {
  AcademicStatusForm,
  AcademicStatusList,
  ViewAcademicStatus,
} from "./components/Master/AcademicStatusMasterFC";

import {
  SMTPConfigForm,
  SMTPConfigList,
  ViewSMTPConfig,
} from "./components/Master/SMTPConfigMasterFC";
import {
  FeeHeadTypeForm,
  FeeHeadTypeList,
  ViewFeeHeadType,
} from "./components/Master/FeeHeadTypeMasterFC";

import {
  FeeHeadForm,
  FeeHeadList,
  ViewFeeHead,
} from "./components/Master/FeeHeadMasterFC";

import {
  CourseTypeForm,
  CourseTypeList,
  ViewCourseType,
} from "./components/Master/CourseTypeMasterFC";

import {
  ProgramYearForm,
  ProgramYearList,
  ViewProgramYear,
} from "./components/Master/ProgramYearMasterFC";

//import  SignIn  from "./Authentication/Login";
import SignUp from "./Authentication/Signup";
import ForgotPassword from "./Authentication/Forgetpassword";
import {
  DivisionList,
  DivisionForm,
  ViewDivision,
} from "./components/Master/DivisionMasterFC";

import {
  ModeOfAdmissionList,
  ModeOfAdmissionForm,
  ViewModeOfAdmission,
} from "./components/Master/ModeOfAdmissionMasterFC";

import {
  DocumentMasterForm,
  DocumentMasterList,
  ViewDocumentMaster,
} from "./components/Master/DocumentMasterFC";

import {
  DesignationForm,
  DesignationList,
  ViewDesignation,
} from "./components/Master/DesignationMasterFC";

import { BankForm, BankList, ViewBank } from "./components/Master/BankMasterFC";

import {
  SyllabusPatternForm,
  SyllabusPatternList,
  ViewSyllabusPattern,
} from "./components/Master/SyllabusPatternMasterFC";

import {
  ReservationCategoryForm,
  ReservationCategoryList,
  ViewReservationCategory,
} from "./components/Master/ReservationCategoryMasterFC";

import {
  AllotmentCategoryList,
  AllotmentCategoryForm,
  ViewAllotmentCategory,
} from "./components/Master/AllotmentCategoryMasterFC";

import {
  AccreditationList,
  AccreditationForm,
  ViewAccreditation,
} from "./components/Master/AccreditationMasterFC";

import {
  SMSTemplateForm,
  SMSTemplateList,
  ViewSMSTemplate,
} from "./components/Master/SMSTemplateMasterFC";

import {
  ProgramDetailList,
  ProgramDetailForm,
  ViewProgramDetail,
} from "./components/Master/ProgramDetailMasterFC";

import {
  SemesterDetailsList,
  SemesterDetailsForm,
  ViewSemesterDetails,
} from "./components/Master/SemesterDetailsMasterFC";

//import SignUp from "./components/Pages/Authentication/SignUp/SignUp";
//const AuthSignup = React.lazy(() => import("./Authentication/Signup"));
import OnlineForm from "./components/Admission/onlineAdmission/OnlineForm";
import NewAdmissionForm from "./components/Admission/newAdmission/NewAdmissionForm";
import { MenuForm, MenuList, ViewMenu } from "./components/Master/MenuMasterFC";
import {
  BranchForm,
  BranchList,
  ViewBranch,
} from "./components/Master/BranchMasterFC";
import StudentProfile from "./components/Admission/StudentProfile/StudentProfile";

import MainapprovalForm from "./components/Admission/AdmissionApproval/Mainapproval";
// import MainapplicationForm from "./components/Admission/OfflineApplicationList/Mainapplication";
import ChangeForgotPassword from "./Authentication/ChangeForgotPassword";

const Login = React.lazy(() => import("./Authentication/Login"));

const Switcherapp = React.lazy(
  () => import("../src/shade/layouts/Switcherapp")
);
const Custompages = React.lazy(
  () => import("../src/shade/layouts/custompages")
);
const Dashboard = React.lazy(
  () => import("./components/Dashboard/Dashboard-1/Dashboard")
);
const Cards = React.lazy(() => import("./components/App/Cards/Cards"));
const Contacts = React.lazy(() => import("./components/App/Contacts/Contacts"));

const Filedetails = React.lazy(
  () => import("./components/App/File-details/Filedetails")
);

const Filemanager = React.lazy(
  () => import("./components/App/File-manager/Filemanager")
);

const Imagecompare = React.lazy(
  () => import("./components/App/Image-compare/Imagecompare")
);

const Notification = React.lazy(
  () => import("./components/App/Notification/Notification")
);

const Widgetnotification = React.lazy(
  () => import("./components/App/Widget-notification/Widget-notification")
);

const Treeview = React.lazy(() => import("./components/App/Treeview/Treeview"));

const Calendar = React.lazy(() => import("./components/App/Calendar/Calendar"));

const Filemanager1 = React.lazy(
  () => import("./components/App/File-manager1/Filemanager1")
);

const Rangeslider = React.lazy(
  () => import("./components/App/Range-slider/Rangeslider")
);
const Images = React.lazy(() => import("./components/Elements/Images/Images"));
const Alerts = React.lazy(() => import("./components/Elements/Alerts/Alerts"));
const Avatar = React.lazy(() => import("./components/Elements/Avatar/Avatar"));

const Breadcrumbs = React.lazy(
  () => import("./components/Elements/Breadcrumbs/Breadcrumbs")
);

const Buttons = React.lazy(
  () => import("./components/Elements/Buttons/Buttons")
);

const Badges = React.lazy(() => import("./components/Elements/Badge/Badge"));

const Dropdowns = React.lazy(
  () => import("./components/Elements/Dropdown/Dropdown")
);

const Thumbnails = React.lazy(
  () => import("./components/Elements/Thumbnails/Thumbnails")
);

const ListGroups = React.lazy(
  () => import("./components/Elements/ListGroup/ListGroup")
);

const Mediaobject = React.lazy(
  () => import("./components/Elements/Mediaobject/Mediaobject")
);

const Navigation = React.lazy(
  () => import("./components/Elements/Navigation/Navigation")
);

const Pagination = React.lazy(
  () => import("./components/Elements/Pagination/Pagination")
);

const Popover = React.lazy(
  () => import("./components/Elements/Popover/Popover")
);

const Progress = React.lazy(
  () => import("./components/Elements/Progress/Progress")
);

const Spinners = React.lazy(
  () => import("./components/Elements/Spinners/Spinners")
);

const Typography = React.lazy(
  () => import("./components/Elements/Typography/Typography")
);

const Tooltip = React.lazy(
  () => import("./components/Elements/Tooltip/Tooltip")
);

const Toast = React.lazy(() => import("./components/Elements/Toast/Toast"));
const Tabs = React.lazy(() => import("./components/Elements/Tabs/Tabs"));
const Tags = React.lazy(() => import("./components/Elements/Tags/Tags"));

const Accordions = React.lazy(
  () => import("./components/AdvancedUI/Accordion/Accordion")
);

const Modals = React.lazy(
  () => import("./components/AdvancedUI/Modals/Modals")
);

const Rating = React.lazy(
  () => import("./components/AdvancedUI/Ratings/Ratings")
);

const Carousel = React.lazy(
  () => import("./components/AdvancedUI/Carousel/Carousel")
);

const Collapse = React.lazy(
  () => import("./components/AdvancedUI/Collapse/Collapse")
);

const Timeline = React.lazy(
  () => import("./components/AdvancedUI/Timeline/Timeline")
);

const Sweetalert = React.lazy(
  () => import("./components/AdvancedUI/Sweetalert/Sweetalert")
);
const Counters = React.lazy(
  () => import("./components/AdvancedUI/Counters/Counters")
);

const Blog = React.lazy(() => import("./components/AdvancedUI/Blog/Blog"));

const Userlist = React.lazy(
  () => import("./components/AdvancedUI/Userlist/Userlist")
);
const Search = React.lazy(
  () => import("./components/AdvancedUI/Search/Search")
);
const Blogdetails = React.lazy(
  () => import("./components/AdvancedUI/Blog-details/Blogdetails")
);
const EditPost = React.lazy(
  () => import("./components/AdvancedUI/Edit-post/Editpost")
);
const Fileattachments = React.lazy(
  () => import("./components/AdvancedUI/FileAttachments/FileAttachments")
);

const Apexcharts = React.lazy(
  () => import("./components/Charts/Apexcharts/Apexcharts")
);
const ChartJS = React.lazy(() => import("./components/Charts/ChartJS/ChartJS"));
const Widgets = React.lazy(() => import("./components/Widgets/Widgets"));
const Echart = React.lazy(() => import("./components/Charts/Echart/Echart"));

// const SignUp = React.lazy(
//   () => import("./components/Pages/Authentication/SignUp/SignUp")
// );
const SignIn = React.lazy(
  () => import("./components/Pages/Authentication/SignIn/SignIn")
);
// const ForgotPassword = React.lazy(
//   () =>
//     import("./components/Pages/Authentication/ForgotPassword/ForgotPassword")
// );
const Lockscreen = React.lazy(
  () => import("./components/Pages/Authentication/Lockscreen/Lockscreen")
);
const ResetPassword = React.lazy(
  () => import("./components/Pages/Authentication/ResetPassword/ResetPassword")
);
const UnderConstruction = React.lazy(
  () =>
    import(
      "./components/Pages/Authentication/UnderConstruction/UnderConstruction"
    )
);
const Error404 = React.lazy(
  () => import("./components/Pages/Authentication/404Error/404Error")
);
const Error500 = React.lazy(
  () => import("./components/Pages/Authentication/500Error/500Error")
);
const Error501 = React.lazy(
  () => import("./components/Pages/Authentication/501Error/501Error")
);
const Cart = React.lazy(() => import("./components/Pages/Ecommerce/Cart/Cart"));
const Checkout = React.lazy(
  () => import("./components/Pages/Ecommerce/Check-out/Check-out")
);
const ProductDetails = React.lazy(
  () => import("./components/Pages/Ecommerce/Product-Details/Product-Details")
);
const Shop = React.lazy(() => import("./components/Pages/Ecommerce/Shop/Shop"));
const Wishlist = React.lazy(
  () => import("./components/Pages/Ecommerce/Wish-list/Wish-list")
);
const EmptyPage = React.lazy(
  () => import("./components/Pages/EmptyPage/EmptyPage")
);
const Faqs = React.lazy(() => import("./components/Pages/Faqs/Faqs"));
const Gallery = React.lazy(() => import("./components/Pages/Gallery/Gallery"));
const Invoice = React.lazy(() => import("./components/Pages/Invoice/Invoice"));
const Chat = React.lazy(() => import("./components/Pages/Mail/Chat/Chat"));
const Mail = React.lazy(() => import("./components/Pages/Mail/Mail/Mail"));
const Mailsettings = React.lazy(
  () => import("./components/Pages/Mail/Mail-settings/Mail-settings")
);
const MailCompose = React.lazy(
  () => import("./components/Pages/Mail/MailCompose/MailCompose")
);
const Readmail = React.lazy(
  () => import("./components/Pages/Mail/Read-mail/Read-mail")
);
const Notificationslist = React.lazy(
  () => import("./components/Pages/Notifications-list/Notifications-list")
);
const Pricing = React.lazy(() => import("./components/Pages/Pricing/Pricing"));
const Settings = React.lazy(
  () => import("./components/Pages/Settings/Settings")
);
const Todotask = React.lazy(
  () => import("./components/Pages/Todotask/Todotask")
);
const Aboutus = React.lazy(() => import("./components/Pages/Aboutus/Aboutus"));
const Profile = React.lazy(() => import("./components/Pages/Profile/Profile"));

//pages
//Utilities
const Extras = React.lazy(() => import("./components/Utilities/Extras/Extras"));
const Background = React.lazy(
  () => import("./components/Utilities/Background/Background")
);
const Border = React.lazy(() => import("./components/Utilities/Border/Border"));
const Display = React.lazy(
  () => import("./components/Utilities/Display/Display")
);
const Width = React.lazy(() => import("./components/Utilities/Width/Width"));
const Position = React.lazy(
  () => import("./components/Utilities/Position/Position")
);
const Padding = React.lazy(
  () => import("./components/Utilities/Padding/Padding")
);
const Margin = React.lazy(() => import("./components/Utilities/Margin/Margin"));
const Flex = React.lazy(() => import("./components/Utilities/Flex/Flex"));
const Height = React.lazy(() => import("./components/Utilities/Height/Height"));

//Utilities end
//Icons
const FontAwesome = React.lazy(
  () => import("./components/Icons/FontAwesome/FontAwesome")
);
const MaterialIcons = React.lazy(
  () => import("./components/Icons/MaterialIcons/MaterialIcons")
);
const MaterialDesignIcons = React.lazy(
  () => import("./components/Icons/MaterialDesignIcons/MaterialDesignIcons")
);
const IonicIcons = React.lazy(
  () => import("./components/Icons/IonicIcons/IonicIcons")
);
const Pe7Icons = React.lazy(
  () => import("./components/Icons/Pe7Icons/Pe7Icons")
);
const SimpleLineIcons = React.lazy(
  () => import("./components/Icons/SimpleLineIcons/SimpleLineIcons")
);
const ThemifyIcons = React.lazy(
  () => import("./components/Icons/ThemifyIcons/ThemifyIcons")
);
const TypiconsIcons = React.lazy(
  () => import("./components/Icons/TypiconsIcons/TypiconsIcons")
);
const WeatherIcons = React.lazy(
  () => import("./components/Icons/WeatherIcons/WeatherIcons")
);
const BootstrapIcons = React.lazy(
  () => import("./components/Icons/BootstrapIcons/BootstrapIcons")
);
const FeatherIcons = React.lazy(
  () => import("./components/Icons/FeatherIcons/FeatherIcons")
);
const FlagIcons = React.lazy(
  () => import("./components/Icons/FlagIcons/FlagIcons")
);
//Icons end
//Form
const FormElements = React.lazy(
  () => import("./components/Forms/FormElements/FormElements")
);
const FormEditor = React.lazy(
  () => import("./components/Forms/FormEditor/FormEditor")
);
const Formelementsizes = React.lazy(
  () => import("./components/Forms/Form-element-sizes/Form-element-sizes")
);
const FormLayouts = React.lazy(
  () => import("./components/Forms/FormLayouts/FormLayouts")
);
const FormInputSpinners = React.lazy(
  () => import("./components/Forms/FormInputSpinners/FormInputSpinners")
);
const FormValidation = React.lazy(
  () => import("./components/Forms/FormValidation/FormValidation")
);
const FormWizard = React.lazy(
  () => import("./components/Forms/FormWizard/FormWizard")
);
const AdvancedForms = React.lazy(
  () => import("./components/Forms/AdvancedForms/AdvancedForms")
);
const LeafletMaps = React.lazy(
  () => import("./components/Maps/LeafletMaps/LeafletMaps")
);
const VectorMaps = React.lazy(
  () => import("./components/Maps/VectorMaps/VectorMaps")
);
const DefaultTables = React.lazy(
  () => import("./components/Tables/DefaultTables/DefaultTables")
);
const DataTables = React.lazy(
  () => import("./components/Tables/DataTables/DataTables")
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.Fragment>
    <BrowserRouter>
      <Provider store={store}>
        <React.Suspense fallback={<Loader />}>
          <Routes>
            {/* <Route path={`${process.env.PUBLIC_URL}/`} element={<Auth />}>
          <Route index element={<AuthLogin />} />
          
          <Route
            path={`${process.env.PUBLIC_URL}/authentication/login`}
            element={<AuthLogin />}
          />
            <Route
            path={`${process.env.PUBLIC_URL}/authentication/signup`}
            element={<AuthSignup />}
          />
          </Route>  */}
            <Route path={`/`} element={<Auth />}>
              <Route index element={<Login />} />
              <Route path={`signup`} element={<SignUp />} />
              <Route path={`forgotpassword`} element={<ForgotPassword />} />
              <Route path={`changeforgotpassword/:id`} element={<ChangeForgotPassword />} />
            </Route>

            <Route path={`${process.env.PUBLIC_URL}/`} element={<App />}>
              <Route
                path={`${process.env.PUBLIC_URL}/Dashboard`}
                element={<Dashboard />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/widgets`}
                element={<Widgets />}
              />

              <Route
                path={`${process.env.PUBLIC_URL}/online`}
                element={<OnlineForm />}
              />

              <Route
                path={`${process.env.PUBLIC_URL}/new-admission`}
                element={<NewAdmissionForm />}
              />

              <Route
                path={`${process.env.PUBLIC_URL}/student-profile`}
                element={<StudentProfile />}
              />

              <Route>
                <Route
                  path={"appointment-type"}
                  element={<AppointmentTypeList />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/appointment-type/add`}
                  element={<AppointmentTypeForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/appointment-type/update/:id`}
                  element={<AppointmentTypeForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/appointment-type/view/:id`}
                  element={<ViewAppointmentType />}
                />
              </Route>

              <Route>
                <Route
                  path={"candidature-type"}
                  element={<CandidatureList />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/candidature-type/add`}
                  element={<CandidatureForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/candidature-type/update/:id`}
                  element={<CandidatureForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/candidature-type/view/:id`}
                  element={<ViewCandidature />}
                />
              </Route>

              <Route>
                <Route
                  path={"course-category"}
                  element={<CourseCategoryList />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/course-category/add`}
                  element={<CourseCategoryForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/course-category/update/:id`}
                  element={<CourseCategoryForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/course-category/view/:id`}
                  element={<ViewCourseCategory />}
                />
              </Route>

              <Route>
                <Route path={"country"} element={<CountryList />} />
                <Route
                  path={`${process.env.PUBLIC_URL}/country/add`}
                  element={<CountryForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/country/update/:id`}
                  element={<CountryForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/country/view/:id`}
                  element={<ViewCountry />}
                />
              </Route>

              <Route>
                <Route path={"domicile"} element={<DomicileList />} />
                <Route
                  path={`${process.env.PUBLIC_URL}/domicile/add`}
                  element={<DomicileForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/domicile/update/:id`}
                  element={<DomicileForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/domicile/view/:id`}
                  element={<ViewDomicile />}
                />
              </Route>

              <Route>
                <Route
                  path={"caste-category"}
                  element={<CasteCategoryList />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/caste-category/add`}
                  element={<CasteCategoryForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/caste-category/update/:id`}
                  element={<CasteCategoryForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/caste-category/view/:id`}
                  element={<ViewCasteCategory />}
                />
              </Route>

              <Route>
                <Route path={"religion"} element={<ReligionList />} />
                <Route
                  path={`${process.env.PUBLIC_URL}/religion/add`}
                  element={<ReligionForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/religion/update/:id`}
                  element={<ReligionForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/religion/view/:id`}
                  element={<ViewReligion />}
                />
              </Route>

              <Route>
                <Route path={"annual-income"} element={<AnnualIncomeList />} />
                <Route
                  path={`${process.env.PUBLIC_URL}/annual-income/add`}
                  element={<AnnualIncomeForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/annual-income/update/:id`}
                  element={<AnnualIncomeForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/annual-income/view/:id`}
                  element={<ViewAnnualIncome />}
                />
              </Route>

              <Route>
                <Route path={"relation"} element={<RelationList />} />
                <Route
                  path={`${process.env.PUBLIC_URL}/relation/add`}
                  element={<RelationForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/relation/update/:id`}
                  element={<RelationForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/relation/view/:id`}
                  element={<ViewRelation />}
                />
              </Route>

              <Route>
                <Route path={"Semester"} element={<SemesterList />} />
                <Route
                  path={`${process.env.PUBLIC_URL}/semester/add`}
                  element={<SemesterForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/semester/update/:id`}
                  element={<SemesterForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/semester/view/:id`}
                  element={<ViewSemester />}
                />
              </Route>

              <Route>
                <Route path={"board"} element={<BoardList />} />
                <Route
                  path={`${process.env.PUBLIC_URL}/board/add`}
                  element={<BoardForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/board/update/:id`}
                  element={<BoardForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/board/view/:id`}
                  element={<ViewBoard />}
                />
              </Route>

              <Route>
                <Route path={"state"} element={<StateList />} />
                <Route
                  path={`${process.env.PUBLIC_URL}/state/add`}
                  element={<StateForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/state/update/:id`}
                  element={<StateForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/state/view/:id`}
                  element={<ViewState />}
                />
              </Route>

              <Route>
                <Route path={"employee-type"} element={<EmployeeTypeList />} />
                <Route
                  path={`${process.env.PUBLIC_URL}/employee-type/add`}
                  element={<EmployeeTypeForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/employee-type/update/:id`}
                  element={<EmployeeTypeForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/employee-type/view/:id`}
                  element={<ViewEmployeeType />}
                />
              </Route>

              <Route>
                <Route path={"minority"} element={<MinorityList />} />
                <Route
                  path={`${process.env.PUBLIC_URL}/minority/add`}
                  element={<MinorityForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/minority/update/:id`}
                  element={<MinorityForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/minority/view/:id`}
                  element={<ViewMinority />}
                />
              </Route>

              <Route>
                <Route path={"caste"} element={<CasteList />} />
                <Route
                  path={`${process.env.PUBLIC_URL}/caste/add`}
                  element={<CasteForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/caste/update/:id`}
                  element={<CasteForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/caste/view/:id`}
                  element={<ViewCaste />}
                />
              </Route>

              <Route>
                <Route path={"district"} element={<DistrictList />} />
                <Route
                  path={`${process.env.PUBLIC_URL}/district/add`}
                  element={<DistrictForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/district/update/:id`}
                  element={<DistrictForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/district/view/:id`}
                  element={<ViewDistrict />}
                />
              </Route>

              <Route>
                <Route path={"handicap-type"} element={<HandicapTypeList />} />
                <Route
                  path={`${process.env.PUBLIC_URL}/handicap-type/add`}
                  element={<HandicapTypeForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/handicap-type/update/:id`}
                  element={<HandicapTypeForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/handicap-type/view/:id`}
                  element={<ViewHandicapType />}
                />
              </Route>

              <Route>
                <Route
                  path={"common-subject"}
                  element={<CommonSubjectList />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/common-subject/add`}
                  element={<CommonSubjectForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/common-subject/update/:id`}
                  element={<CommonSubjectForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/common-subject/view/:id`}
                  element={<ViewCommonSubject />}
                />
              </Route>

              <Route>
                <Route path={"blood-group"} element={<BloodGroupList />} />
                <Route
                  path={`${process.env.PUBLIC_URL}/blood-group/add`}
                  element={<BloodGroupForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/blood-group/update/:id`}
                  element={<BloodGroupForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/blood-group/view/:id`}
                  element={<ViewBloodGroup />}
                />
              </Route>

              <Route>
                <Route path={"taluka"} element={<TalukaList />} />
                <Route
                  path={`${process.env.PUBLIC_URL}/taluka/add`}
                  element={<TalukaForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/taluka/update/:id`}
                  element={<TalukaForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/taluka/view/:id`}
                  element={<ViewTaluka />}
                />
              </Route>

              <Route>
                <Route path={"sub-caste"} element={<SubCasteList />} />
                <Route
                  path={`${process.env.PUBLIC_URL}/sub-caste/add`}
                  element={<SubCasteForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/sub-caste/update/:id`}
                  element={<SubCasteForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/sub-caste/view/:id`}
                  element={<ViewSubCaste />}
                />
              </Route>

              <Route>
                <Route
                  path={"minority-details"}
                  element={<MinorityDetailsList />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/minority-details/add`}
                  element={<MinorityDetailsForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/minority-details/update/:id`}
                  element={<MinorityDetailsForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/minority-details/view/:id`}
                  element={<ViewMinorityDetails />}
                />
              </Route>

              <Route>
                <Route path={"mother-tongue"} element={<MotherTongueList />} />
                <Route
                  path={`${process.env.PUBLIC_URL}/mother-tongue/add`}
                  element={<MotherTongueForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/mother-tongue/update/:id`}
                  element={<MotherTongueForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/mother-tongue/view/:id`}
                  element={<ViewMotherTongue />}
                />
              </Route>

              <Route>
                <Route
                  path={`${process.env.PUBLIC_URL}/time-slot`}
                  element={<TimeSlotList />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/time-slot/add`}
                  element={<TimeSlotForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/time-slot/update/:id`}
                  element={<TimeSlotForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/time-slot/view/:id`}
                  element={<ViewTimeSlot />}
                />
              </Route>

              <Route>
                <Route path={"college"} element={<CollegeList />} />
                <Route
                  path={`${process.env.PUBLIC_URL}/college/add`}
                  element={<CollegeForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/college/update/:id`}
                  element={<CollegeForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/college/view/:id`}
                  element={<ViewCollege />}
                />
              </Route>

              <Route>
                <Route path={"seat-type"} element={<SeatTypeList />} />
                <Route
                  path={`${process.env.PUBLIC_URL}/seat-type/add`}
                  element={<SeatTypeForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/seat-type/update/:id`}
                  element={<SeatTypeForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/seat-type/view/:id`}
                  element={<ViewSeatType />}
                />
              </Route>

              <Route>
                <Route path={"academic-year"} element={<AcademicYearList />} />
                <Route
                  path={`${process.env.PUBLIC_URL}/academic-year/add`}
                  element={<AcademicYearForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/academic-year/update/:id`}
                  element={<AcademicYearForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/academic-year/view/:id`}
                  element={<ViewAcademicYear />}
                />
              </Route>

              <Route>
                <Route path={"evaluation"} element={<EvaluationList />} />
                <Route
                  path={`${process.env.PUBLIC_URL}/evaluation/add`}
                  element={<EvaluationForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/evaluation/update/:id`}
                  element={<EvaluationForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/evaluation/view/:id`}
                  element={<ViewEvaluation />}
                />
              </Route>

              <Route>
                <Route
                  path={"admission-type"}
                  element={<AdmissionTypeList />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/admission-type/add`}
                  element={<AdmissionTypeForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/admission-type/update/:id`}
                  element={<AdmissionTypeForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/admission-type/view/:id`}
                  element={<ViewAdmissionType />}
                />
              </Route>

              <Route>
                <Route path={"department"} element={<DepartmentList />} />
                <Route
                  path={`${process.env.PUBLIC_URL}/department/add`}
                  element={<DepartmentForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/department/update/:id`}
                  element={<DepartmentForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/department/view/:id`}
                  element={<ViewDepartment />}
                />
              </Route>

              <Route>
                <Route path={"program"} element={<ProgramList />} />
                <Route
                  path={`${process.env.PUBLIC_URL}/program/add`}
                  element={<ProgramForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/program/update/:id`}
                  element={<ProgramForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/program/view/:id`}
                  element={<ViewProgram />}
                />
              </Route>

              <Route>
                <Route path={"study"} element={<StudyList />} />
                <Route
                  path={`${process.env.PUBLIC_URL}/study/add`}
                  element={<StudyForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/study/update/:id`}
                  element={<StudyForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/study/view/:id`}
                  element={<ViewStudy />}
                />
              </Route>

              <Route>
                <Route path={"program-type"} element={<ProgramTypeList />} />
                <Route
                  path={`${process.env.PUBLIC_URL}/program-type/add`}
                  element={<ProgramTypeForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/program-type/update/:id`}
                  element={<ProgramTypeForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/program-type/view/:id`}
                  element={<ViewProgramType />}
                />
              </Route>

              <Route>
                <Route>
                  <Route path={"exam-type"} element={<ExamTypeList />} />
                  <Route
                    path={`${process.env.PUBLIC_URL}/exam-type/add`}
                    element={<ExamTypeForm />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/exam-type/update/:id`}
                    element={<ExamTypeForm />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/exam-type/view/:id`}
                    element={<ViewExamType />}
                  />
                </Route>
              </Route>

              <Route>
                <Route path={"stream"} element={<StreamList />} />
                <Route
                  path={`${process.env.PUBLIC_URL}/stream/add`}
                  element={<StreamForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/stream/update/:id`}
                  element={<StreamForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/stream/view/:id`}
                  element={<ViewStream />}
                />
              </Route>

              <Route>
                <Route
                  path={"academic-status"}
                  element={<AcademicStatusList />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/academic-status/add`}
                  element={<AcademicStatusForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/academic-status/update/:id`}
                  element={<AcademicStatusForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/academic-status/view/:id`}
                  element={<ViewAcademicStatus />}
                />
              </Route>

              <Route>
                <Route path={"smtp-config"} element={<SMTPConfigList />} />
                <Route
                  path={`${process.env.PUBLIC_URL}/smtp-config/add`}
                  element={<SMTPConfigForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/smtp-config/update/:id`}
                  element={<SMTPConfigForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/smtp-config/view/:id`}
                  element={<ViewSMTPConfig />}
                />
              </Route>

              <Route>
                <Route path={"feehead-type"} element={<FeeHeadTypeList />} />
                <Route
                  path={`${process.env.PUBLIC_URL}/feehead-type/add`}
                  element={<FeeHeadTypeForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/feehead-type/update/:id`}
                  element={<FeeHeadTypeForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/feehead-type/view/:id`}
                  element={<ViewFeeHeadType />}
                />
              </Route>

              <Route>
                <Route path={"division"} element={<DivisionList />} />
                <Route
                  path={`${process.env.PUBLIC_URL}/division/add`}
                  element={<DivisionForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/division/update/:id`}
                  element={<DivisionForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/division/view/:id`}
                  element={<ViewDivision />}
                />
              </Route>

              <Route>
                <Route>
                  <Route path={"fee-head"} element={<FeeHeadList />} />
                  <Route
                    path={`${process.env.PUBLIC_URL}/fee-head/add`}
                    element={<FeeHeadForm />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/fee-head/update/:id`}
                    element={<FeeHeadForm />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/fee-head/view/:id`}
                    element={<ViewFeeHead />}
                  />
                </Route>
              </Route>

              <Route>
                <Route path={"document"} element={<DocumentMasterList />} />
                <Route
                  path={`${process.env.PUBLIC_URL}/document/add`}
                  element={<DocumentMasterForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/document/update/:id`}
                  element={<DocumentMasterForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/document/view/:id`}
                  element={<ViewDocumentMaster />}
                />
              </Route>

              <Route>
                <Route path={"designation"} element={<DesignationList />} />
                <Route
                  path={`${process.env.PUBLIC_URL}/designation/add`}
                  element={<DesignationForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/designation/update/:id`}
                  element={<DesignationForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/designation/view/:id`}
                  element={<ViewDesignation />}
                />
              </Route>

              <Route>
                <Route>
                  <Route path={"course-type"} element={<CourseTypeList />} />
                  <Route
                    path={`${process.env.PUBLIC_URL}/course-type/add`}
                    element={<CourseTypeForm />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/course-type/update/:id`}
                    element={<CourseTypeForm />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/course-type/view/:id`}
                    element={<ViewCourseType />}
                  />
                </Route>
              </Route>

              <Route>
                <Route>
                  <Route path={"program-year"} element={<ProgramYearList />} />
                  <Route
                    path={`${process.env.PUBLIC_URL}/program-year/add`}
                    element={<ProgramYearForm />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/program-year/update/:id`}
                    element={<ProgramYearForm />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/program-year/view/:id`}
                    element={<ViewProgramYear />}
                  />
                </Route>
              </Route>

              <Route>
                <Route
                  path={"reservation-category"}
                  element={<ReservationCategoryList />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/reservation-category/add`}
                  element={<ReservationCategoryForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/reservation-category/update/:id`}
                  element={<ReservationCategoryForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/reservation-category/view/:id`}
                  element={<ViewReservationCategory />}
                />
              </Route>
              <Route>
                <Route>
                  <Route path={"bank"} element={<BankList />} />
                  <Route
                    path={`${process.env.PUBLIC_URL}/bank/add`}
                    element={<BankForm />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/bank/update/:id`}
                    element={<BankForm />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/bank/view/:id`}
                    element={<ViewBank />}
                  />
                </Route>
              </Route>
              <Route>
                <Route>
                  <Route
                    path={"syllabus-pattern"}
                    element={<SyllabusPatternList />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/syllabus-pattern/add`}
                    element={<SyllabusPatternForm />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/syllabus-pattern/update/:id`}
                    element={<SyllabusPatternForm />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/syllabus-pattern/view/:id`}
                    element={<ViewSyllabusPattern />}
                  />
                </Route>
              </Route>

              <Route>
                <Route>
                  <Route
                    path={"program-detail"}
                    element={<ProgramDetailList />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/program-detail/add`}
                    element={<ProgramDetailForm />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/program-detail/update/:id`}
                    element={<ProgramDetailForm />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/program-detail/view/:id`}
                    element={<ViewProgramDetail />}
                  />
                </Route>
                <Route>
                  <Route
                    path={"admission-mode"}
                    element={<ModeOfAdmissionList />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/admission-mode/add`}
                    element={<ModeOfAdmissionForm />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/admission-mode/update/:id`}
                    element={<ModeOfAdmissionForm />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/admission-mode/view/:id`}
                    element={<ViewModeOfAdmission />}
                  />
                </Route>

                <Route>
                  <Route path={"sms-template"} element={<SMSTemplateList />} />
                  <Route
                    path={`${process.env.PUBLIC_URL}/sms-template/add`}
                    element={<SMSTemplateForm />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/sms-template/update/:id`}
                    element={<SMSTemplateForm />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/sms-template/view/:id`}
                    element={<ViewSMSTemplate />}
                  />
                </Route>
                {/* </Route> */}

                <Route>
                  <Route
                    path={"allotment-category"}
                    element={<AllotmentCategoryList />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/allotment-category/add`}
                    element={<AllotmentCategoryForm />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/allotment-category/update/:id`}
                    element={<AllotmentCategoryForm />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/allotment-category/view/:id`}
                    element={<ViewAllotmentCategory />}
                  />
                </Route>

                <Route>
                  <Route
                    path={"admission-mode"}
                    element={<ModeOfAdmissionList />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/admission-mode/add`}
                    element={<ModeOfAdmissionForm />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/admission-mode/update/:id`}
                    element={<ModeOfAdmissionForm />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/admission-mode/view/:id`}
                    element={<ViewModeOfAdmission />}
                  />
                </Route>
                <Route>
                  <Route
                    path={"semester-details"}
                    element={<SemesterDetailsList />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/semester-details/add`}
                    element={<SemesterDetailsForm />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/semester-details/update/:id`}
                    element={<SemesterDetailsForm />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/semester-details/view/:id`}
                    element={<ViewSemesterDetails />}
                  />
                </Route>

                <Route>
                  <Route path={"branch"} element={<BranchList />} />
                  <Route
                    path={`${process.env.PUBLIC_URL}/branch/add`}
                    element={<BranchForm />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/branch/update/:id`}
                    element={<BranchForm />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/branch/view/:id`}
                    element={<ViewBranch />}
                  />
                </Route>

                <Route>
                  <Route
                    path={"accreditation"}
                    element={<AccreditationList />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/accreditation/add`}
                    element={<AccreditationForm />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/accreditation/update/:id`}
                    element={<AccreditationForm />}
                  />
                  <Route
                    path={`${process.env.PUBLIC_URL}/accreditation/view/:id`}
                    element={<ViewAccreditation />}
                  />
                </Route>
                <Route
                  path={`${process.env.PUBLIC_URL}/application-list`}
                  element={<MainapprovalForm />}
                />
                {/* <Route
                  path={`${process.env.PUBLIC_URL}/offline-application-list`}
                  element={<MainapplicationForm />}
                /> */}
              </Route>

              <Route>
                <Route path={"menu"} element={<MenuList />} />
                <Route
                  path={`${process.env.PUBLIC_URL}/menu/add`}
                  element={<MenuForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/menu/update/:id`}
                  element={<MenuForm />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/menu/view/:id`}
                  element={<ViewMenu />}
                />
              </Route>
              {/*------------- END -------------- */}
            </Route>

            <Route>
              <Route
                path={`${process.env.PUBLIC_URL}/dashboard/dashboard-1`}
                element={<Dashboard />}
              />
              {/* <Route
                path={`${process.env.PUBLIC_URL}/dashboard/dashboard-2`}
                element={<Dashboard2 />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/dashboard/dashboard-3`}
                element={<Dashboard3 />}
              /> */}
            </Route>
            <Route>
              <Route
                path={`${process.env.PUBLIC_URL}/app/cards`}
                element={<Cards />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/app/contacts`}
                element={<Contacts />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/app/filedetails`}
                element={<Filedetails />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/app/filemanager`}
                element={<Filemanager />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/app/filemanager1`}
                element={<Filemanager1 />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/app/imageCompare`}
                element={<Imagecompare />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/app/notification`}
                element={<Notification />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/app/widgetNotification`}
                element={<Widgetnotification />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/app/calendar`}
                element={<Calendar />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/app/treeview`}
                element={<Treeview />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/app/rangeslider`}
                element={<Rangeslider />}
              />
            </Route>
            <Route>
              <Route
                path={`${process.env.PUBLIC_URL}/elements/alerts`}
                element={<Alerts />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/elements/avatar`}
                element={<Avatar />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/elements/breadcrumbs`}
                element={<Breadcrumbs />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/elements/buttons`}
                element={<Buttons />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/elements/images`}
                element={<Images />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/elements/badges`}
                element={<Badges />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/elements/dropdown`}
                element={<Dropdowns />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/elements/thumbnails`}
                element={<Thumbnails />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/elements/listgroup`}
                element={<ListGroups />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/elements/navigation`}
                element={<Navigation />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/elements/pagination`}
                element={<Pagination />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/elements/popover`}
                element={<Popover />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/elements/mediaObject`}
                element={<Mediaobject />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/elements/progress`}
                element={<Progress />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/elements/spinners`}
                element={<Spinners />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/elements/typography`}
                element={<Typography />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/elements/tooltip`}
                element={<Tooltip />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/elements/toast`}
                element={<Toast />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/elements/tags`}
                element={<Tags />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/elements/tabs`}
                element={<Tabs />}
              />
            </Route>

            <Route>
              <Route
                path={`${process.env.PUBLIC_URL}/advancedui/accordions`}
                element={<Accordions />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/advancedui/carousel`}
                element={<Carousel />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/advancedui/collapse`}
                element={<Collapse />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/advancedui/modal`}
                element={<Modals />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/advancedui/timeline`}
                element={<Timeline />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/advancedui/sweetalert`}
                element={<Sweetalert />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/advancedui/rating`}
                element={<Rating />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/advancedui/counters`}
                element={<Counters />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/advancedui/blog`}
                element={<Blog />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/advancedui/userlist`}
                element={<Userlist />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/advancedui/search`}
                element={<Search />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/advancedui/blogdetails`}
                element={<Blogdetails />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/advancedui/editPost`}
                element={<EditPost />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/advancedui/fileattachments`}
                element={<Fileattachments />}
              />
            </Route>
            <Route>
              <Route
                path={`${process.env.PUBLIC_URL}/pages/aboutus`}
                element={<Aboutus />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/pages/profile`}
                element={<Profile />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/pages/notificationlist`}
                element={<Notificationslist />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/pages/settings`}
                element={<Settings />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/pages/pricing`}
                element={<Pricing />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/pages/todotask`}
                element={<Todotask />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/pages/faqs`}
                element={<Faqs />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/pages/gallery`}
                element={<Gallery />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/pages/invoice`}
                element={<Invoice />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/pages/emptypage`}
                element={<EmptyPage />}
              />
            </Route>
            <Route>
              <Route
                path={`${process.env.PUBLIC_URL}/pages/e-commerce/shop`}
                element={<Shop />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/pages/e-commerce/productDetails/:id`}
                element={<ProductDetails />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/pages/e-commerce/productDetails`}
                element={<ProductDetails />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/pages/e-commerce/cart`}
                element={<Cart />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/pages/e-commerce/checkout`}
                element={<Checkout />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/pages/e-commerce/wishlist`}
                element={<Wishlist />}
              />
            </Route>
            <Route>
              <Route
                path={`${process.env.PUBLIC_URL}/pages/mail/mail`}
                element={<Mail />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/pages/mail/mailcompose`}
                element={<MailCompose />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/pages/mail/readmail`}
                element={<Readmail />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/pages/mail/mailsettings`}
                element={<Mailsettings />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/pages/mail/chat`}
                element={<Chat />}
              />
            </Route>
            <Route>
              <Route
                path={`${process.env.PUBLIC_URL}/icon/fontAwesome`}
                element={<FontAwesome />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/icon/materialIcons`}
                element={<MaterialIcons />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/icon/materialDesignIcons`}
                element={<MaterialDesignIcons />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/icon/ionicIcons`}
                element={<IonicIcons />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/icon/typiconsIcons`}
                element={<TypiconsIcons />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/icon/weatherIcons`}
                element={<WeatherIcons />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/icon/featherIcons`}
                element={<FeatherIcons />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/icon/flagIcons`}
                element={<FlagIcons />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/icon/pe7Icons`}
                element={<Pe7Icons />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/icon/simpleLineIcons`}
                element={<SimpleLineIcons />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/icon/themifyIcons`}
                element={<ThemifyIcons />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/icon/bootstrapIcons`}
                element={<BootstrapIcons />}
              />
            </Route>
            <Route>
              <Route
                path={`${process.env.PUBLIC_URL}/form/formElements`}
                element={<FormElements />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/form/advancedform`}
                element={<AdvancedForms />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/form/formlayouts`}
                element={<FormLayouts />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/form/formValidation`}
                element={<FormValidation />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/form/formWizard`}
                element={<FormWizard />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/form/formEditor`}
                element={<FormEditor />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/form/formelementsizes`}
                element={<Formelementsizes />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/form/forminputspinners`}
                element={<FormInputSpinners />}
              />
            </Route>
            <Route>
              <Route
                path={`${process.env.PUBLIC_URL}/maps/leafletMaps`}
                element={<LeafletMaps />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/maps/vectorMaps`}
                element={<VectorMaps />}
              />
            </Route>
            <Route>
              <Route
                path={`${process.env.PUBLIC_URL}/tables/defaultTables`}
                element={<DefaultTables />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/tables/dataTables`}
                element={<DataTables />}
              />
            </Route>
            <Route>
              <Route
                path={`${process.env.PUBLIC_URL}/charts/chartJs`}
                element={<ChartJS />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/charts/echart`}
                element={<Echart />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/charts/apexcharts`}
                element={<Apexcharts />}
              />
            </Route>
            <Route>
              <Route>
                <Route
                  path={`${process.env.PUBLIC_URL}/utilities/background`}
                  element={<Background />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/Utilities/border`}
                  element={<Border />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/Utilities/display`}
                  element={<Display />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/Utilities/flex`}
                  element={<Flex />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/Utilities/height`}
                  element={<Height />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/Utilities/margin`}
                  element={<Margin />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/Utilities/padding`}
                  element={<Padding />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/Utilities/position`}
                  element={<Position />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/Utilities/width`}
                  element={<Width />}
                />
                <Route
                  path={`${process.env.PUBLIC_URL}/Utilities/extras`}
                  element={<Extras />}
                />
              </Route>
              <Route
                path={`${process.env.PUBLIC_URL}/pages/Authentication/501error`}
                element={<Error501 />}
              />
            </Route>

            <Route
              path={`${process.env.PUBLIC_URL}/`}
              element={<Custompages />}
            >
              <Route
                path={`${process.env.PUBLIC_URL}/pages/Authentication/sigin`}
                element={<SignIn />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/pages/Authentication/sigup`}
                element={<SignUp />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/pages/Authentication/forgotpassword`}
                element={<ForgotPassword />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/pages/Authentication/resetpassword`}
                element={<ResetPassword />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/pages/Authentication/lockscreen`}
                element={<Lockscreen />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/pages/Authentication/underconstruction`}
                element={<UnderConstruction />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/pages/Authentication/404error`}
                element={<Error404 />}
              />
              <Route
                path={`${process.env.PUBLIC_URL}/pages/Authentication/500error`}
                element={<Error500 />}
              />
              <Route path="*" element={<Error404 />} />
            </Route>

            <Route>
              <Route
                path={`${process.env.PUBLIC_URL}/pages/switcher/switcher-1`}
                element={<Switcherapp />}
              />
            </Route>

            <Route></Route>
          </Routes>
        </React.Suspense>
      </Provider>
    </BrowserRouter>
  </React.Fragment>
);
reportWebVitals();
