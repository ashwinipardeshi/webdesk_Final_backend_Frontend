export const MENUITEMS = [
  {
    menutitle: "GLOBAL MASTERS",
    Items: [
      {
        title: "GLOBAL MASTERS",
        icon: (
          <svg
            className="side-menu__icon"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm7.931 9h-2.764a14.67 14.67 0 0 0-1.792-6.243A8.013 8.013 0 0 1 19.931 11zM12.53 4.027c1.035 1.364 2.427 3.78 2.627 6.973H9.03c.139-2.596.994-5.028 2.451-6.974.172-.01.344-.026.519-.026.179 0 .354.016.53.027zm-3.842.7C7.704 6.618 7.136 8.762 7.03 11H4.069a8.013 8.013 0 0 1 4.619-6.273zM4.069 13h2.974c.136 2.379.665 4.478 1.556 6.23A8.01 8.01 0 0 1 4.069 13zm7.381 6.973C10.049 18.275 9.222 15.896 9.041 13h6.113c-.208 2.773-1.117 5.196-2.603 6.972-.182.012-.364.028-.551.028-.186 0-.367-.016-.55-.027zm4.011-.772c.955-1.794 1.538-3.901 1.691-6.201h2.778a8.005 8.005 0 0 1-4.469 6.201z"></path>
          </svg>
        ),
        type: "sub",
        selected: false,
        active: false,
        children: [
          {
            path: `${process.env.PUBLIC_URL}/country`,
            title: "Country Master",
            type: "link",
            active: false,
            selected: false,
          },
          {
            path: `${process.env.PUBLIC_URL}/state`,
            title: "State Master",
            type: "link",
            active: false,
            selected: false,
          },
          {
            path: `${process.env.PUBLIC_URL}/district`,
            title: "District Master",
            type: "link",
            active: false,
            selected: false,
          },
          {
            path: `${process.env.PUBLIC_URL}/taluka`,
            title: "Taluka Master",
            type: "link",
            active: false,
            selected: false,
          },
          {
            path: `${process.env.PUBLIC_URL}/semester`,
            title: "Semester Master",
            type: "link",
            active: false,
            selected: false,
          },
          {
            path: `${process.env.PUBLIC_URL}/board`,
            title: "Board Master",
            type: "link",
            active: false,
            selected: false,
          },
          {
            path: `${process.env.PUBLIC_URL}/religion`,
            title: "Religion Master",
            type: "link",
            active: false,
            selected: false,
          },
          {
            path: `${process.env.PUBLIC_URL}/caste`,
            title: "Caste Master",
            type: "link",
            active: false,
            selected: false,
          },
          {
            path: `${process.env.PUBLIC_URL}/sub-caste`,
            title: "SubCaste Master",
            type: "link",
            active: false,
            selected: false,
          },
          {
            path: `${process.env.PUBLIC_URL}/relation`,
            title: "Relation Master",
            type: "link",
            active: false,
            selected: false,
          },
          {
            path: `${process.env.PUBLIC_URL}/course-Category`,
            title: "Course Category Master",
            type: "link",
            active: false,
            selected: false,
          },
          {
            path: `${process.env.PUBLIC_URL}/appointment-type`,
            title: "Appointment Type Master",
            type: "link",
            active: false,
            selected: false,
          },
          {
            path: `${process.env.PUBLIC_URL}/employee-type`,
            title: "Employee Type Master",
            type: "link",
            active: false,
            selected: false,
          },
          {
            path: `${process.env.PUBLIC_URL}/domicile`,
            title: "Domicile Master",
            type: "link",
            active: false,
            selected: false,
          },
          {
            path: `${process.env.PUBLIC_URL}/mother-tongue`,
            title: "Mother Tongue Master",
            type: "link",
            active: false,
            selected: false,
          },
          {
            path: `${process.env.PUBLIC_URL}/blood-group`,
            title: "Blood Group Master",
            type: "link",
            active: false,
            selected: false,
          },
          {
            path: `${process.env.PUBLIC_URL}/candidature-type`,
            title: "Candidature Type Master",
            type: "link",
            active: false,
            selected: false,
          },
          {
            path: `${process.env.PUBLIC_URL}/minority`,
            title: "Minority Master",
            type: "link",
            active: false,
            selected: false,
          },
          {
            path: `${process.env.PUBLIC_URL}/minority-details`,
            title: "Minority Details Master",
            type: "link",
            active: false,
            selected: false,
          },
          {
            path: `${process.env.PUBLIC_URL}/annual-income`,
            title: "Annual Income Master",
            type: "link",
            active: false,
            selected: false,
          },

          {
            path: `${process.env.PUBLIC_URL}/time-slot`,
            title: "Time Slot Master",
            type: "link",
            active: false,
            selected: false,
          },
          {
            path: `${process.env.PUBLIC_URL}/caste-category`,
            title: "Caste Category Master",
            type: "link",
            active: false,
            selected: false,
          },
          {
            path: `${process.env.PUBLIC_URL}/handicap-type`,
            title: "Handicap Type Master",
            type: "link",
            active: false,
            selected: false,
          },
          {
            path: `${process.env.PUBLIC_URL}/common-subject`,
            title: "Common Subject Master",
            type: "link",
            active: false,
            selected: false,
          },
        ],
      },
    ],
  },
  {
    menutitle: "Master",
    Items: [
      {
        title: "Master",
        icon: (
          <svg
            className="side-menu__icon"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm7.931 9h-2.764a14.67 14.67 0 0 0-1.792-6.243A8.013 8.013 0 0 1 19.931 11zM12.53 4.027c1.035 1.364 2.427 3.78 2.627 6.973H9.03c.139-2.596.994-5.028 2.451-6.974.172-.01.344-.026.519-.026.179 0 .354.016.53.027zm-3.842.7C7.704 6.618 7.136 8.762 7.03 11H4.069a8.013 8.013 0 0 1 4.619-6.273zM4.069 13h2.974c.136 2.379.665 4.478 1.556 6.23A8.01 8.01 0 0 1 4.069 13zm7.381 6.973C10.049 18.275 9.222 15.896 9.041 13h6.113c-.208 2.773-1.117 5.196-2.603 6.972-.182.012-.364.028-.551.028-.186 0-.367-.016-.55-.027zm4.011-.772c.955-1.794 1.538-3.901 1.691-6.201h2.778a8.005 8.005 0 0 1-4.469 6.201z"></path>
          </svg>
        ),
        type: "sub",
        selected: false,
        active: false,
        children: [
          {
            path: `${process.env.PUBLIC_URL}/branch`,
            title: "Branch Master",
            type: "link",
            active: false,
            selected: false,
          },
          {
            path: `${process.env.PUBLIC_URL}/college`,
            title: "College Master",
            type: "link",
            active: false,
            selected: false,
          },

          {
            path: `${process.env.PUBLIC_URL}/stream`,
            title: "Stream Master",
            type: "link",
            active: false,
            selected: false,
          },
          {
            path: `${process.env.PUBLIC_URL}/accreditation`,
            title: "Accreditation Master",
            type: "link",
            active: false,
            selected: false,
          },
          {
            path: `${process.env.PUBLIC_URL}/academic-year`,
            title: "Academic Year Master",
            type: "link",
            active: false,
            selected: false,
          },
          {
            path: `${process.env.PUBLIC_URL}/admission-mode`,
            title: "Mode of Admission Master",
            type: "link",
            active: false,
            selected: false,
          },
          {
            path: `${process.env.PUBLIC_URL}/allotment-category`,
            title: "Allotment Category Master",
            type: "link",
            active: false,
            selected: false,
          },
          {
            path: `${process.env.PUBLIC_URL}/department`,
            title: "Department Master",
            type: "link",
            active: false,
            selected: false,
          },
          {
            path: `${process.env.PUBLIC_URL}/admission-type`,
            title: "Admission Type Master",
            type: "link",
            active: false,
            selected: false,
          },
          {
            path: `${process.env.PUBLIC_URL}/study`,
            title: "Study Master",
            type: "link",
            active: false,
            selected: false,
          },
          {
            path: `${process.env.PUBLIC_URL}/program-type`,
            title: "Program Type Master",
            type: "link",
            active: false,
            selected: false,
          },
          {
            path: `${process.env.PUBLIC_URL}/program`,
            title: "Program Master",
            type: "link",
            active: false,
            selected: false,
          },
          {
            path: `${process.env.PUBLIC_URL}/program-detail`,
            title: "Program Detail Master",
            type: "link",
            active: false,
            selected: false,
          },
          {
            path: `${process.env.PUBLIC_URL}/program-year`,
            title: "Program Year Master",
            type: "link",
            active: false,
            selected: false,
          },
          {
            path: `${process.env.PUBLIC_URL}/division`,
            title: "Division Master",
            type: "link",
            active: false,
            selected: false,
          },
          {
            path: `${process.env.PUBLIC_URL}/document`,
            title: "Document Master",
            type: "link",
            active: false,
            selected: false,
          },
          {
            path: `${process.env.PUBLIC_URL}/exam-type`,
            title: "Exam Type Master",
            type: "link",
            active: false,
            selected: false,
          },
          {
            path: `${process.env.PUBLIC_URL}/fee-head`,
            title: "Fee Head Master",
            type: "link",
            active: false,
            selected: false,
          },
          {
            path: `${process.env.PUBLIC_URL}/feehead-type`,
            title: "Fee Head Type Master",
            type: "link",
            active: false,
            selected: false,
          },
          {
            path: `${process.env.PUBLIC_URL}/bank`,
            title: "Bank Master",
            type: "link",
            active: false,
            selected: false,
          },
          {
            path: `${process.env.PUBLIC_URL}/syllabus-pattern`,
            title: "Syllabus Pattern Master",
            type: "link",
            active: false,
            selected: false,
          },
          {
            path: `${process.env.PUBLIC_URL}/semester-details`,
            title: "Semester Details Master",
            type: "link",
            active: false,
            selected: false,
          },
          {
            path: `${process.env.PUBLIC_URL}/evaluation`,
            title: "Evaluation Master",
            type: "link",
            active: false,
            selected: false,
          },
          {
            path: `${process.env.PUBLIC_URL}/academic-status`,
            title: "Academic Status Master",
            type: "link",
            active: false,
            selected: false,
          },
          {
            path: `${process.env.PUBLIC_URL}/smtp-config`,
            title: "SMTPConfig Master",
            type: "link",
            active: false,
            selected: false,
          },
          {
            path: `${process.env.PUBLIC_URL}/sms-template`,
            title: "SMS Template Master",
            type: "link",
            active: false,
            selected: false,
          },
          {
            path: `${process.env.PUBLIC_URL}/designation`,
            title: "Designation Master",
            type: "link",
            active: false,
            selected: false,
          },
          {
            path: `${process.env.PUBLIC_URL}/reservation-category`,
            title: "Reservation Category Master",
            type: "link",
            active: false,
            selected: false,
          },
          {
            path: `${process.env.PUBLIC_URL}/course-type`,
            title: "Course Type Master",
            type: "link",
            active: false,
            selected: false,
          },
          {
            path: `${process.env.PUBLIC_URL}/seat-type`,
            title: "Seat Type Master",
            type: "link",
            active: false,
            selected: false,
          },
          // {
          //   path: `${process.env.PUBLIC_URL}/menu`,
          //   title: "Menu Master",
          //   type: "link",
          //   active: false,
          //   selected: false,
          // },
        ],
      },
    ],
  },
  {
    menutitle: "Admission",
    Items: [
      {
        title: "Admission",
        icon: (
          <svg
            className="side-menu__icon"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm7.931 9h-2.764a14.67 14.67 0 0 0-1.792-6.243A8.013 8.013 0 0 1 19.931 11zM12.53 4.027c1.035 1.364 2.427 3.78 2.627 6.973H9.03c.139-2.596.994-5.028 2.451-6.974.172-.01.344-.026.519-.026.179 0 .354.016.53.027zm-3.842.7C7.704 6.618 7.136 8.762 7.03 11H4.069a8.013 8.013 0 0 1 4.619-6.273zM4.069 13h2.974c.136 2.379.665 4.478 1.556 6.23A8.01 8.01 0 0 1 4.069 13zm7.381 6.973C10.049 18.275 9.222 15.896 9.041 13h6.113c-.208 2.773-1.117 5.196-2.603 6.972-.182.012-.364.028-.551.028-.186 0-.367-.016-.55-.027zm4.011-.772c.955-1.794 1.538-3.901 1.691-6.201h2.778a8.005 8.005 0 0 1-4.469 6.201z"></path>
          </svg>
        ),
        type: "sub",
        selected: false,
        active: false,
        children: [
          {
            path: `${process.env.PUBLIC_URL}/new-admission`,
            title: "New Admission",
            type: "link",
            active: false,
            selected: false,
          },
          {
            path: `${process.env.PUBLIC_URL}/application-list`,
            title: "Application List",
            type: "link",
            active: false,
            selected: false,
          },
          // {
          //   path: `${process.env.PUBLIC_URL}/offline-application-list`,
          //   title: "Confirm Application List",
          //   type: "link",
          //   active: false,
          //   selected: false,
          // },
        ],
      },
    ],
  }
];
