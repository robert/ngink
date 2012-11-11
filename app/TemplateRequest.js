function TemplateRequest(path, data, insertion_options){
  this.path = path;
  this.data = data;
  this.insertionOptions = insertion_options;

  this.templateContent = null;
}

TemplateRequest.prototype.send = function(callback){
  if(window.TPL[this.path]) {
    this.templateContent = window.TPL[this.path];
    callback(this);
  }
  else {
    var that = this;

    var req = new XMLHttpRequest();
    req.open("GET", chrome.extension.getURL("app/templates/" + this.path), true);
    req.onreadystatechange = function() {
      if (req.readyState == 4 && req.status == 200) {
        window.TPL[that.path] = req.responseText;
        that.templateContent = req.responseText;
        callback(that);
      }
    };
    req.send(null);
  }
};

TemplateRequest.prototype.html = function(){
  return Mustache.to_html(this.templateContent, this.data);
};