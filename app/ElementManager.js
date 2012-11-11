function ElementManager(element_identifier){
  this.elementIdentifier = element_identifier;

  this.processedTemplateRequests = [];
  this.unprocessedTemplateRequests = [];
  this.allTemplatesAdded = false;
  this.elementDisplayQueued = false;
}

// we can probably save some ms here by caching $el
ElementManager.prototype.$el = function(){
  return $(this.elementIdentifier);
}

ElementManager.prototype.addTemplateRequest = function(template_path, data, insertion_options){
  var that = this;

  var templateRequest = new TemplateRequest(template_path, data, insertion_options);
  this.unprocessedTemplateRequests.push(templateRequest);
  templateRequest.send(_.bind(this.processTemplateRequest, this));

  console.log("NGINK: " + templateRequest.path + " queued");
}

ElementManager.prototype.processTemplateRequest = function(template_request){
  $(template_request.insertionOptions.elementIdentifier).ready(function(){
    $el = $(template_request.insertionOptions.elementIdentifier);
    switch(template_request.insertionOptions.action){
      case "append":
        $el.append(template_request.html());
      case "prepend":
        $el.prepend(template_request.html());
    }
  });
  this.markTemplateRequestAsProcessed(template_request);
  this.displayElementIfPermitted();
}

ElementManager.prototype.markTemplateRequestAsProcessed = function(template_request){
  var index = this.unprocessedTemplateRequests.indexOf(template_request);
  this.unprocessedTemplateRequests.splice(index, 1);
  this.processedTemplateRequests.push(template_request);
  console.log("NGINK: " + template_request.path + " processed");
}

ElementManager.prototype.displayElementIfPermitted = function(){
  if(this.allTemplateRequestsProcessed && this.allTemplateRequestsAdded && !this.elementDisplayQueued){
    this.displayElement();
  }
}

ElementManager.prototype.allTemplateRequestsProcessed = function(){
  this.unprocessedTemplates.length == 0;
}

ElementManager.prototype.displayElement = function(){
  var that = this;
  this.$el().ready(function(){
    that.$el().show();
    console.log(that.$el());
    console.log("NGINK: Element displayed");
  });
  this.elementDisplayQueued = true;
  console.log("NGINK: Element displayable");
}

ElementManager.prototype.doneAddingTemplateRequests = function(){
  this.allTemplateRequestsAdded = true;
  this.displayElementIfPermitted();
  console.log("NGINK: DONE ADDING TEMPLATE REQUESTS");
}