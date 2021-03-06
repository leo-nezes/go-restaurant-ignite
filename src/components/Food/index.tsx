import { FiEdit3, FiTrash } from 'react-icons/fi';

import { useHandleFood } from '../../hooks/useHandleFood';
import { Container } from './styles';

import { IFood } from '../../types';

interface IFoodProps {
  food: IFood;
  handleDeleteFood: (id: number) => void;
  handleEditFood: (food: IFood) => void;
}

const Food = ({ food, handleEditFood, handleDeleteFood}: IFoodProps): JSX.Element => {
  const { updateFoodAvailability } = useHandleFood();
  
  function setHandleEditFood(): void {
    handleEditFood(food);
  }
  
  function setHandleDeleteFood(): void {
    handleDeleteFood(food.id);
  }

  const toggleAvailable = (id: number): void => {
    updateFoodAvailability(id);
  };

  return (
    <Container available={food.available}>
      <header>
        <img src={food.image} alt={food.name} />
      </header>
      <section className="body">
        <h2>{food.name}</h2>
        <p>{food.description}</p>
        <p className="price">
          R$ <b>{food.price}</b>
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={setHandleEditFood}
            data-testid={`edit-food-${food.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={setHandleDeleteFood}
            data-testid={`remove-food-${food.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{food.available ? 'Disponível' : 'Indisponível'}</p>

          <label htmlFor={`available-switch-${food.id}`} className="switch">
            <input
              id={`available-switch-${food.id}`}
              type="checkbox"
              checked={food.available}
              onChange={() => toggleAvailable(food.id)}
              data-testid={`change-status-food-${food.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  );
};

export default Food;
