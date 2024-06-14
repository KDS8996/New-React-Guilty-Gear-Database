import Button from "./Button";
import Input from "./Input";

import { useForm } from 'react-hook-form';
import { server_calls } from '../api/server';
import { useDispatch, useStore } from 'react-redux';
import { chooseName, chooseOrigin, chooseSpecialMove } from '../redux/slices/RootSlice';

interface FighterFormProps {
  id?: string[]
}

const FighterForm = (props:FighterFormProps) => {
  const { register, handleSubmit } = useForm({})
  const dispatch = useDispatch();
  const store = useStore();

  const onSubmit = (data: any, event: any) => {
    console.log(`ID: ${typeof props.id}`)
    console.log(props.id);
    console.log(data)
    if (props.id && props.id.length > 0) {
      server_calls.update(props.id[0], data)
      console.log(`Updated: ${data.name} ${props.id}`)
      setTimeout(() => {window.location.reload()}, 500)
      event.target.reset()
    } else {
      // Use dispatch to update our state in our store
      dispatch(chooseName(data.name));
      dispatch(chooseOrigin(data.origin));
      dispatch(chooseSpecialMove(data.special_move));

      server_calls.create(store.getState())
      setTimeout(() => {window.location.reload()}, 500);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Fighter Name</label>
          <Input {...register('name')} name='name' placeholder="Name"/>
        </div>
        <div>
          <label htmlFor="origin">Origin</label>
          <Input {...register('origin')} name='origin' placeholder="Origin"/>
        </div>
        <div>
          <label htmlFor="special_move">Special Move</label>
          <Input {...register('special_move')} name='special_move' placeholder="Special Move"/>
        </div>
        <div className="flex p-1">
            <Button
              className="flex justify-start m-3 bg-slate-300 p-2 rounded hover:bg-slate-800 text-white"
              >
                Submit
              </Button>
        </div>
      </form>
    </div>
  )
}

export default FighterForm;
