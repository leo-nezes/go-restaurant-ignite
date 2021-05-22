import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

import api from "../services/api";
import { IFood } from '../types';

interface HandleFoodProviderProps {
  children: ReactNode
}

interface HandleFoodData {
  foods: IFood[];
  setFoods: Dispatch<SetStateAction<IFood[]>>;
  addFood: (food: Omit<IFood, 'id'>) => void;
  updateFood: (food: Omit<IFood, 'id'>) => void;
  updateFoodAvailability: (id: number) => Promise<void>;
  deleteFood: (idFood: number) => void;
}

const HandleFoodContext = createContext<HandleFoodData>({} as HandleFoodData);

export function HandleFoodProvider({ children }: HandleFoodProviderProps) {
  const [ foods, setFoods ] = useState<IFood[]>([]);

  const addFood = (food: Omit<IFood, 'id'>) => {
    // const { foods } = his.state;

    // try {
    //   const response = await api.post('/foods', {
    //     ...food,
    //     available: true,
    //   });

      // this.setState({ foods: [...foods, response.data] });
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const updateFood = (food: Omit<IFood, 'id'>) => {};

  const updateFoodAvailability = async (id: number): Promise<void> => {
    const food = foods.find(food => food.id === id);

    const response = await api.post('/foods', {
          ...food,
          available: !food?.available,
        });

    const newFoods = foods.map(food => {
      if(food.id === id) return response.data;

      return food;
    })

    setFoods([...newFoods]);
  };

  const deleteFood = (idFood: number) => {};

  return (
    <HandleFoodContext.Provider 
      value={{ foods, setFoods, addFood, updateFood, updateFoodAvailability, deleteFood }}
    >
      {children}
    </HandleFoodContext.Provider>
  );
};

export function useHandleFood(): HandleFoodData {
  const context = useContext(HandleFoodContext);

  return context;
}