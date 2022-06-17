import constructorIngredientStyles from "./constructorIngredient.module.css";
import PropTypes from "prop-types";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { moveItem } from "../../services/action/constructorState";
import { useDrop, useDrag } from "react-dnd";

const ConstructorIngredient = ({ index, item, handleClose }) => {
  const { id } = item;
  const dispatch = useDispatch();
  const ref = useRef(null);
  //хук для области перетаскивания - ингредиенты в самом конструкторе между булок
  const [{ handlerId }, drop] = useDrop({
    accept: "data", //массив с данными как область перетаскивания
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    //срабатывает, когда ингредиент зависает над областью перетаскивания ингредиентов
    hover(item, monitor) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index; //индекс элемента в списке
      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
      //диспатч для изменения индекса ингредиента в конструкторе. Выполняется при проведении курсора с захваченным ингредиентом
      dispatch(moveItem(dragIndex, hoverIndex)); 
      item.index = hoverIndex;
    },
  });
  //хук для перетаскиваемых ингредиентов между булок в конструкторе
  const [{ isDragging }, drag] = useDrag({
    type: "data", //массив с данными как тип перетаскивания
    item: () => {
      return { id, index }; //необходимые данные для визуализации представления элемента
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <li className={`${constructorIngredientStyles.constructor__element} ${isDragging ? constructorIngredientStyles.constructor__drag : ""}`} data-handler-id={handlerId} ref={ref}>
      <div className={`${constructorIngredientStyles.constructor__dragIcon} mr-2`}>
        <DragIcon />
      </div>
      <ConstructorElement
      isLocked={false}
      text={item.name}
      price={item.price}
      thumbnail={item.image_mobile}
      handleClose={handleClose} />
    </li>
  );
};
export default ConstructorIngredient;
//проверка передаваемых пропсов
ConstructorIngredient.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.any.isRequired,
  handleClose: PropTypes.func.isRequired,
};
