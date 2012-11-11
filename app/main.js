window.TPL = {};

// $(function() {
//   $("body").append("<div id='lol-messenger'></div>");
//   $("#lol-messenger").bind("click", function() {
//     if(window.location.href == "http://www.facebook.com/"){
//       doIt();
//     }
//   });
// });

doIt();

function doIt(){
  console.log("DOING IT");
  newsFeedManager = new ElementManager("ul.uiStreamHomepage");
  newsFeedManager.addTemplateRequest(
    "newsfeed_post.html", 
    {
      "message": {
        "user": {
          "full_name": "James Shakespeare"
        },
        "body": "Oh hai there"
      }
    },
    {
      "elementIdentifier": "ul.uiStreamHomepage",
      "action": "prepend"
    }
  );
  newsFeedManager.addTemplateRequest(
    "newsfeed_post.html", 
    {
      "message": {
        "user": {
          "full_name": "Steven Harp"
        },
        "body": "Meat!!"
      }
    },
    {
      "elementIdentifier": "ul.uiStreamHomepage",
      "action": "prepend"
    }
  );
  newsFeedManager.doneAddingTemplateRequests();
}