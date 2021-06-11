<h2>jQuery() --> $() </h2></br>
$("..") , the jquery selector, is used to select matched elements.

<h6>Return value</h6>

* It always return an jquery object,which is an array-like object with indexes as keys and "HTML object" as values and also has a length property,

<h6>Calling methods on returned jQuery object</h6>

* Methods of jquery could be called on the jQuery object, and apply to those selected elements.

<h6>Access original element by index</h6>

* Here keys is index that starts with 0 , and values are the selected element.
  After accessing the original element via index, you can treat it as if get by document.getElementXxx().

<h6>Wrap an original element to a jquery object</h6>

* After get the original element, you can wrap it to be a jquery object, by calling $(originalElement),
then you can call jquery methods on the wrapped object.

<h2>AJAX</h2></br>
* Converting to AJAX so as we can call a url and add/remove elements using JavaScript. 
* This helps as every time we do not need to reload pages again and again to add/remove elements.

<pre>
$.ajax({
    type:"get",
    url: "/create"
    success:function(){
        
    },
    error:function(err){
        console.log(err.responseText);
    }
});
</pre>
