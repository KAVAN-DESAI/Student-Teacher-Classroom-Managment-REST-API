const router = require('express').Router();

router.get('', async (req, res) => {
    res.end(JSON.stringify({
        message: 'This is Kavan Desai Backend Assignment',
        api: {
            Homepage: "https://obscure-mountain-47599.herokuapp.com/",
            Authentification: {
                register: '/api/user/register',
                login: '/api/user/login',
            },
            Classroom: {
                addClassroom: '/api/classroom/add',
                getAllClassroom: '/api/classroom/classrooms',
                updateClassroom: '/api/classroom/update',
                deleteClassroom: '/api/classroom/delete',
                assignClassroom: '/api/classroom/assign',
            },
            ClassroomFile: {
                uploadFileClassroom: '/api/classroom/file/upload',
                renameFileClassroom: '/api/classroom/file/rename',
                updateFileClassroom: '/api/classroom/file/update',
                deleteFileClassroom: '/api/classroom/file/delete',
            },
            Feed: {
                getClassesFeed: '/api/feed/classes',
                getFilesFeedByFilter: '/api/feed/files',
                searchFileByName: '/api/feed/files/search',
            },
        },
        Info: {
            Message: "Made with <3",
            TechStack: {
                language: "javascript",
                runtimeEnv: "Node.js",
                framework: "Express",
                database: "MongoDB"
            }
        },
        herokuFaliur: {
            ifTrue: "try to check readme and run it locally! sorry for this",
            else: "Enjoy the API :)"
        }
    }, null, "   ")
    );
})

module.exports = router;