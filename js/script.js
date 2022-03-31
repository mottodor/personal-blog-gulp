const modalBtn = document.querySelectorAll("[data-modal]");
const body = document.body;
const page = document.getElementById("page");
const modalClose = document.querySelectorAll(".modal__close");
const modal = document.querySelectorAll(".modal");
const burger = document.getElementById("sidebarToggle");
const sidebar = document.getElementById("sidebar");
const textArea = document.querySelectorAll("[data-autoresize]");

modalBtn.forEach((item) => {
	item.addEventListener("click", (event) => {
		let $this = event.currentTarget;
		let modalId = $this.getAttribute("data-modal");
		let modal = document.getElementById(modalId);
		let modalContent = modal.querySelector(".modal__content");

		modalContent.addEventListener("click", (event) => {
			event.stopPropagation();
		});

		modal.classList.add("show");
		body.classList.add("no-scroll");

		setTimeout(() => {
			modalContent.style.transform = "none";
			modalContent.style.opacity = "1";
		}, 1);
	});
});

modalClose.forEach((item) => {
	item.addEventListener("click", (event) => {
		let currModal = event.currentTarget.closest(".modal");

		closeModal(currModal);
	});
});

modal.forEach((item) => {
	item.addEventListener("click", (event) => {
		let currModal = event.target;

		closeModal(currModal);
	});
});

function closeModal(currModal) {
	let modalContent = currModal.querySelector(".modal__content");
	modalContent.removeAttribute("style");
	setTimeout(() => {
		currModal.classList.remove("show");
		body.classList.remove("no-scroll");
	}, 200);
}

textArea.forEach((item) => {
	let textAreaH = item.offsetHeight;

	item.addEventListener("input", (event) => {
		let $this = event.target;

		$this.style.height = textAreaH + "px";
		$this.style.height = $this.scrollHeight + "px";
	});
});

burger.addEventListener("click", (event) => {
	if (body.classList.contains("show-sidebar")) {
		closeSidebar();
	} else {
		showSidebar();
	}
});

function showSidebar() {
	let mask = document.createElement("div");
	mask.classList.add("page__mask");
	mask.addEventListener("click", closeSidebar);
	page.appendChild(mask);
	body.classList.add("show-sidebar");
}

function closeSidebar() {
	body.classList.remove("show-sidebar");
	document.querySelector(".page__mask").remove();
}
