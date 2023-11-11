export const STAFF_MENUITEMS = [
    {
        menutitle: "Admission",
        Items: [
            {
                title: "Admission",
                icon: (
                    <svg
                        className="side-menu__icon"
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 0 24 24"
                        width="24px"
                        fill="#000000">
                        <path d="M0 0h24v24H0z" fill="none" /><path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3 1 9l11 6 9-4.91V17h2V9L12 3z" />
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
                    //     path: `${process.env.PUBLIC_URL}/offline-application-list`,
                    //     title: "Confirm Admission List",
                    //     type: "link",
                    //     active: false,
                    //     selected: false,
                    // },
                ],
            },

        ],
    },
];
