const nameTag = (() => {
  const create = (iconName, e) => {
    document.querySelector(".name-tag")?.remove();

    const pElement = document.createElement("p");
    pElement.className = "name-tag";
    pElement.classList.add("name-tag-" + iconName.toLowerCase());
    pElement.textContent = iconName;

    pElement.style.color = "whitesmoke";
    pElement.style.backgroundColor = "darkslategrey";

    e.target.appendChild(pElement);
  };

  const remove = () => {
    const activeNameTag = document.querySelector(".name-tag");
    activeNameTag.remove();
  };

  return {
    create,
    remove,
  };
})();

export default nameTag;
