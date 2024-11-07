import React from 'react';
import {getDishTypes} from '../api.js'

const useDishTypes = () => {
  const [dishTypes, setDishTypes] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchDishTypes = async () => {
      setLoading(true);
      try {
        const types = await getDishTypes();
        setDishTypes(types);
      } catch (error) {
        console.error('Error fetching dish types:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDishTypes();
  }, []);

  return { dishTypes, loading };
};

export default useDishTypes;