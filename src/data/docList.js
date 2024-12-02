const docList = [
    {
        id: 10,
        description: "Sales Report",
        fileName: "sales-spe2014.xls",
        sharedBy: [
            {
                "id": 'fdhfd12',
                fullName: "Jane Smith",
                email: "jane.smith@gmail.com",
            },
            {
                "id": 'fdhfd13',
                fullName: "Anne Hunter",
                email: "anne.hunter@gmail.com",
            }
        ]

    },
    {
        id: 20,
        description: "Quarterly Report",
        fileName: "quarterly-1-2014.xls",
        sharedBy: [
            {
                "id": 'fd3hfd13',
                fullName: "Anne Hunter",
                email: "anne.hunter@gmail.com",
            }
        ]
    },
    {
        id: 30,
        description: "Projection 2013-14",
        fileName: "projection-spe2014.xls",
        sharedBy: []
    },
];

export default docList;