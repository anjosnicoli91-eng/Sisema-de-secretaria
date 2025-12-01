// notas.js — minimal behavior to match other pages
document.getElementById('btnNewNote')?.addEventListener('click', function(e){
	e.preventDefault();
	alert('Abrir formulário para nova nota (placeholder)');
});

// future: implement modal open/close and localStorage persistence
