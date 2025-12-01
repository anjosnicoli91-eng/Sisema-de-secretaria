document.addEventListener('DOMContentLoaded', ()=>{
	const sidebar = document.getElementById('mainSidebar');
	const btnClose = document.getElementById('sidebarClose');
	const btnOpen = document.getElementById('openSidebar');

	function setInitial(){
		if(window.innerWidth >= 900){
			sidebar.style.display = 'block';
			if(btnOpen) btnOpen.style.display = 'none';
		} else {
			sidebar.style.display = 'none';
			if(btnOpen) btnOpen.style.display = 'flex';
		}
	}

	setInitial();
	window.addEventListener('resize', setInitial);

	if(btnClose){ btnClose.addEventListener('click', ()=>{ sidebar.style.display='none'; if(btnOpen) btnOpen.style.display='flex'; }); }
	if(btnOpen){ btnOpen.addEventListener('click', ()=>{ sidebar.style.display='block'; btnOpen.style.display='none'; }); }

	// submenu toggle for items with children
	document.querySelectorAll('.menu-item.has-children').forEach(parent => {
		const toggle = parent.querySelector('.menu-toggle');
		const submenu = parent.querySelector('.submenu');
		if(!toggle || !submenu) return;
		toggle.addEventListener('click', (e)=>{
			e.preventDefault();
			const isOpen = parent.classList.toggle('open');
			toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
			submenu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
		});
	});
});

