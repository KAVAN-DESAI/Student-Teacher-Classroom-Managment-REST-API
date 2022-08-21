const router = require('express').Router();

router.get('',async (req,res)=>{
    res.end(JSON.stringify({
        message: 'This is Kavan Desai Rest API Assignment',
        api: {
            Authentification:{
                register: '/api/user/register',
                login: '/api/user/login',
            },
            Classroom:{
                addClassroom: '/api/classroom/add',
                getAllClassroom: '/api/classroom/classrooms',
                updateClassroom: '/api/classroom/update',
                deleteClassroom: '/api/classroom/delete',
                assignClassroom: '/api/classroom/assign',
            },
            ClassroomFile:{
                uploadFileClassroom: '/api/classroom/file/upload',
                renameFileClassroom: '/api/classroom/file/rename',
                updateFileClassroom: '/api/classroom/file/update',
                deleteFileClassroom: '/api/classroom/file/delete',
            },
            Feed:{
                getClassesFeed: '/api/feed/classes',
                getFilesFeedByFilter: '/api/feed/files',
                searchFileByName: '/api/feed/files/search',
            },
        },

    },null, "   ")
    );
})

module.exports = router;