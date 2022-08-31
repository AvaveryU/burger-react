import constructorIngredientStyles from "./constructorIngredient.module.css";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef, FunctionComponent } from "react";
import { useDispatch, TConstructorIngredientProps } from "../../utils/types";
import { moveItem } from "../../services/action/constructorState";
import { useDrop, useDrag } from "react-dnd";

const ConstructorIngredient: FunctionComponent<TConstructorIngredientProps> = ({ index, item, handleClose }) => {
  const { id } = item;
  const dispatch = useDispatch();
  const ref = useRef<HTMLLIElement>(null);
  //хук для области перетаскивания - ингредиенты в самом конструкторе между булок
  const [{ handlerId }, drop] = useDrop({
    accept: "data", //массив с данными как область перетаскивания
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    //срабатывает, когда ингредиент зависает над областью перетаскивания ингредиентов
    hover(item: TConstructorIngredientProps, monitor) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index; //индекс элемента в списке
      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset !== null && clientOffset.y - hoverBoundingRect.top;
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
    <li
      className={`${constructorIngredientStyles.constructor__element} ${
        isDragging ? constructorIngredientStyles.constructor__drag : ""
      }`}
      data-handler-id={handlerId}
      ref={ref}
    >
      <div className={`${constructorIngredientStyles.constructor__dragIcon} mr-2`}>
        <DragIcon type={"secondary"} />
      </div>
      <ConstructorElement
        isLocked={false}
        text={item.name}
        price={item.price}
        thumbnail={item.image_mobile}
        handleClose={handleClose}
      />
    </li>
  );
};
export default ConstructorIngredient;
