

module.exports = async function(body,parameters) {
    let obj = {};
    if(body.subject && typeof body.subject === String)
    {
        var s = body.subject;
        s = s.replace(/\\n/g, "\\n")  
        .replace(/\\'/g, "\\'")
        .replace(/\\"/g, '\\"')
        .replace(/\\&/g, "\\&")
        .replace(/\\r/g, "\\r")
        .replace(/\\t/g, "\\t")
        .replace(/\\b/g, "\\b")
        .replace(/\\f/g, "\\f");
        s = s.replace(/([a-zA-Z0-9]+?):/g, '"$1":');
        s = s.replace(/'/g, '"');
        body.subject = s.replace(/[\u0000-\u0019]+/g,"");
        body.subject = JSON.parse(body.subject);
    }
    /*
    DATA FORMAT FOR SUBJECT
        [{  
        "name": "abc",
        "stream": "ece",
        "semester": "8",
        "subjectCode":"Hu801" 
        },
        {
            "name": "abcd",
            "stream": "ece",
            "semester": "7",
            "subjectCode":"Hu801" 
        }]
    */
    
    for(let i=0;i<parameters.length;i++)
    {
        if(body[parameters[i]])
        obj[parameters[i]] = body[parameters[i]];
    }
    
    return obj;
}


    
