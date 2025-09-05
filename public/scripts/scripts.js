$("#edit").on("click", (e) => {
	const currParent = $(e.currentTarget).parent().parent();
	
	currParent.children(".card-body").attr("hidden", true);
	currParent.children(".input").attr("hidden", false);
});