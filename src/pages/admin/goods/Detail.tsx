import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const GoodsDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    if (!state.id || !ids.includes(state.id)) {
      navigate('/404');
    }
  }, [state, navigate]);
  return <>商品{state.id}详情页</>;
};
export default GoodsDetail;
