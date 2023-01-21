<script lang="ts">
    import type {ITodo} from '$root/types/todo'

    type CompletedTodoType = (id: string) => void

    export let todo: ITodo
    export let completeTodo: CompletedTodoType
</script>

<li class="todo">
    <div class="todo-item">
        <div>
            <!-- 할일이 완료되었는지 여부 -->
            <!-- on:change를 통해 값이 변하면 completeTodo(string상태).id에 변경 -->
            <input on:change={()=> completeTodo(todo.id)} checked={todo.completed} id="todo" class="toggle" type="checkbox">

            <!-- 아리아 라벨을 통해 스크린 리더가 어떤것인지 설명 할 수 있도록 -->
            <label aria-label="Check todo" class="todo-check" for="todo" />
        </div>

        <!-- 클래스가 completed라면 todo.completed 적용(?) 여기는 좀 더 생각해봐야합니다. -->
        <span class:completed={todo.completed} class="todo-text">{todo.text}</span>
        <button aria-label="Remove todo" class="remove"></button>
    </div>
    <!-- <input class="edit" type="text" autofocus> -->
  </li>

  <style>
    /* Todo */
  
    .todo {
      font-size: var(--font-24);
      font-weight: 400;
      border-bottom: 1px solid #ededed;
    }
  
    .todo:last-child {
      border-bottom: none;
    }
  
    .todo-check,
    .todo-text {
      display: block;
      padding: var(--spacing-16);
      color: var(--color-gray-28);
      transition: color 0.4s;
    }
  
    .todo-check {
      border-radius: 100%;
    }
  
    .completed {
      color: var(--color-gray-58);
      text-decoration: line-through;
    }
  
    .todo-item {
      position: relative;
      display: flex;
      align-items: center;
      padding: 0 var(--spacing-8);
    }
  
    .editing .todo-item {
      display: none;
    }
  
    .edit {
      width: 100%;
      padding: var(--spacing-8);
      font-size: var(--font-24);
      border: 1px solid #999;
      border-radius: var(--radius-base);
      box-shadow: inset 0 -1px 5px 0 var(--shadow-1);
    }
  
    .toggle {
      position: absolute;
      top: 26px;
      left: 13px;
      transform: scale(2);
      opacity: 0;
    }
  
    .toggle + label {
      background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23949494%22%20stroke-width%3D%223%22/%3E%3C/svg%3E');
      background-repeat: no-repeat;
      background-position: 84% 50%;
    }
  
    .toggle:checked + label {
      background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%2359A193%22%20stroke-width%3D%223%22%2F%3E%3Cpath%20fill%3D%22%233EA390%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22%2F%3E%3C%2Fsvg%3E');
    }
  
    .remove {
      display: none;
      margin-left: auto;
      font-size: var(--font-32);
      color: var(--color-gray-58);
      transition: color 0.2s ease-out;
    }
  
    .remove:hover {
      color: var(--color-highlight);
    }
  
    .remove:after {
      content: '×';
    }
  
    .todo:hover .remove {
      display: block;
    }
  </style>