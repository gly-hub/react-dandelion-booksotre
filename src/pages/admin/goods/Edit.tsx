import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const GoodsEdit = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    // 在这里监听传入的商品id，调用商品详情接口，获取商品信息，如果不存在就跳转到404去，存在就展示表单
    // 当前只做路由相关开发，暂时就这样显示一下信息
    const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    if (!state.id || !ids.includes(state.id)) {
      navigate('/404');
    }
  }, [state, navigate]);
  return <>商品{state.id}编辑页</>;
};
export default GoodsEdit;
