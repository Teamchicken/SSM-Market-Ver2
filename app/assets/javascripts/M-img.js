var new_img_field = 
'<div class="M-img-field"><button class="btn btn-dark M-btn-image"><i class="fa fa-image fa-3x"></i> </br>Add Image</button><input name="images[url][]" class="M-image-input" onchange="previewImages(event)" type="file" id="post_images_attributes_0_url"><div class="M-image-output"><div class="btn btn-light M-image-remove" onclick="removeImages(event)"><i class="fa fa-trash"></i></div></div></div>'

var delete_img_field = '<input type="hidden" value="4" name="image_delete[][id]"">'

var maxSizeImages = false;


function showImageInput() {
  if ($('#product_img_field_container').children('.M-img-field').length < 1)
    $('#product_img_field_container').append(new_img_field);
  else
    maxSizeImages = true;
}

function previewImages(event) {
  var reader = new FileReader();
  reader.onload = function () {
    var output = $(event.target).next();
    output.css("backgroundImage", 'url(' + reader.result + ')');
    output.css("display", "block");
    showImageInput();
  }
  reader.readAsDataURL(event.target.files[0]);
}

function removeImages(event) {
  var file_field = $(event.target).parents(".M-img-field");
  file_field.remove();
  if (is_max_image_num) {
    showImageInput();
    maxSizeImages = false;
  }
}

//Show add img button again when remove img
function removeImages(event, id) {
  var file_field = $(event.target).parents(".M-img-field");
  $("#product_img_field_container").append('<input type="hidden" value=' + id + ' name="images_delete[][id]"">');
  file_field.remove();
  if (maxSizeImages) {
    showImageInput();
    maxSizeImages = false;
  }
}