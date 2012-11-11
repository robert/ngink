window.TPL = {};
newsFeedManager = new ElementManager("ul.uiStreamHomepage");
newsFeedManager.addTemplateRequest(
  "background.html", 
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
  "background.html", 
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