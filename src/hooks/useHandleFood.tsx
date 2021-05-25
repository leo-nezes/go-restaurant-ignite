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
  updateFood: (food: IFood) => void;
  updateFoodAvailability: (id: number) => Promise<void>;
  deleteFood: (idFood: number) => void;
}

const HandleFoodContext = createContext<HandleFoodData>({} as HandleFoodData);

export function HandleFoodProvider({ children }: HandleFoodProviderProps) {
  const [ foods, setFoods ] = useState<IFood[]>([]);

  const addFood = async (food: Omit<IFood, 'id'>): Promise<void> => {
    try {
      const response = await api.post('/foods', {
        ...food,
      });

      setFoods([...foods, response.data]);
    } catch (err) {
      console.log(err);
    }
  };

  const updateFood = async (food: IFood): Promise<void> => {
    try {
      const foodUpdated = await api.put<IFood>(`/foods/${food.id}`, { ...food });

      const newFoods = foods.map(food => {
        if(food.id === foodUpdated.data.id) return foodUpdated.data;

        return food;
      });

      setFoods(newFoods);
    } catch (error) {
      console.log(error);
    }
  };

  const updateFoodAvailability = async (id: number): Promise<void> => {
    const food = foods.find(food => food.id === id);

    const response = await api.patch(`/foods/${id}`, {
          available: !food?.available,
        });

    const newFoods = foods.map(food => {
      if(food.id === id) return response.data;

      return food;
    })

    setFoods([...newFoods]);
  };

  const deleteFood = async (idFood: number): Promise<void> => {
    try {
      await api.delete(`/foods/${idFood}`);

      const newFoods = foods.filter(food => food.id !== idFood);

      setFoods(newFoods);
    } catch (error) {
      console.error(error);
    }
  };

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