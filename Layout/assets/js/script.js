function change_color(color, elem) {
	document.querySelectorAll('.colors div, .colors input').forEach(n => n.classList.remove('active'));
	elem.classList.add('active');
	document.getElementById("player").contentDocument.getElementById("svg_131").setAttribute("fill", color);
}

colorPicker = document.getElementById("color_picker");
colorPicker.addEventListener('change', function() {
  change_color(this.value, this);
});