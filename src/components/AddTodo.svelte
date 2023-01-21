
<script lang="ts">
    // addTodo에는 AddTodoType이라는 type을 string으로 지정해놓은 규칙이 정해져 있음
    // 1. handleSubmit 호출시
    // 2. addTodo에 todo 대입
    // 3. todo = '' 를 통해 빈 값 으로 전환

    
    type AddTodoType = (todo: string) => void
    type ToggleCompletedType = (event: MouseEvent) => void
    type TodosAmountType = number

    export let addTodo: AddTodoType
    export let toggleCompleted: ToggleCompletedType
    export let todosAmount: TodosAmountType

    let todo = ''

    function handleSubmit(){
    
        addTodo(todo)
        todo = ''
    }
</script>

<!-- form태그 에서 제출이 발생되면 기본적으로 handleSubmit 함수 호출 -->
<form on:submit|preventDefault={handleSubmit}>
    {#if todosAmount > 0}
        <input on:click={toggleCompleted} type="checkbox" id="toggle-all" class="toggle-all">
        <label aria-label="Mark all as complete" for="toggle-all">
            Mark all as complete
        </label>
    {/if}
    <input bind:value={todo} id="new-todo" class="new-todo" placeholder="what is your anwr?"  type="text" autofocus>
</form>

<style>
    /* Add todo */
  
    .toggle-all {
      width: 1px;
      height: 1px;
      position: absolute;
      opacity: 0;
    }
  
    .toggle-all + label {
      position: absolute;
      font-size: 0;
    }
  
    .toggle-all + label:before {
      content: '❯';
      display: block;
      padding: var(--spacing-16);
      font-size: var(--font-24);
      color: var(--color-gray-58);
      transform: rotate(90deg);
    }
  
    .toggle-all:checked + label:before {
      color: var(--color-gray-28);
    }
  
    .new-todo {
      width: 100%;
      padding: var(--spacing-16);
      padding-left: 60px;
      font-size: var(--font-24);
      border: none;
      border-bottom: 1px solid var(--shadow-1);
    }
</style>