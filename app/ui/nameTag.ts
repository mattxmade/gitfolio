const nameTag = (() => {
  const create = (
    iconName: string,
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    // cast mouse event target
    const parentElement = e.target as HTMLElement;

    // remove any existing name tags from DOM
    document.querySelector(".name-tag")?.remove();

    // create name tag
    const pElement = document.createElement("p");
    pElement.className = "name-tag";
    pElement.classList.add("name-tag-" + iconName.toLowerCase());
    pElement.textContent = iconName;

    // add styling
    pElement.style.color = "whitesmoke";
    pElement.style.backgroundColor = "darkslategrey";

    // append to parent element
    parentElement.appendChild(pElement);
  };

  const remove = () => {
    const activeNameTag = document.querySelector(".name-tag");
    activeNameTag?.remove();
  };

  return {
    create,
    remove,
  };
})();

export default nameTag;
