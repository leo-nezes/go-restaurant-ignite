import { useEffect, useState } from 'react';

import { FoodsContainer } from './styles';

import Header from '../../components/Header';
import api from '../../services/api';
import FoodComponent from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';

import { IFood } from '../../types';
import { useHandleFood } from '../../hooks/useHandleFood';

const Dashboard = (): JSX.Element => {
  const [ editingFood, setEditingFood ] = useState({} as IFood);
  const [ openModal, setOpenModal ] = useState(false);
  const [ openEditModal, setOpenEditModal ] = useState(false);

  const { foods, setFoods, deleteFood } = useHandleFood();

  const toggleModal = (): void => {
    setOpenModal(!openModal);
  };
  
  const toggleEditModal = (): void => {
    setOpenEditModal(!openEditModal);
  };

  const handleEditFood = (editFood: IFood):void => {
    setEditingFood(editFood);
    setOpenEditModal(true);
  };

  const handleDeleteFood = (id: number): void => {
    deleteFood(id);
  };

  useEffect(() => {
    async function loadFoods(): Promise<void> {
      const response = await api.get<IFood[]>('/foods');
  
      setFoods(response.data);
    }

    loadFoods();
  }, [setFoods]);

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={openModal}
        setIsOpen={toggleModal}
      />
      <ModalEditFood
        isOpen={openEditModal}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <FoodComponent
              key={food.id}
              food={food} 
              handleDeleteFood={() => handleDeleteFood(food.id)}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
};

export default Dashboard;
