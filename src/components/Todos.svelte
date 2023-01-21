<script lang="ts">
    // 타입 스크립트를 통한 타입 지정
    import type {ITodo} from '$root/types/todo'

    // AddTodo 가져오기
    import AddTodo from './AddTodo.svelte';
    // id를 가지고 완료를 하는 item을 만들기 위해 Todo 가져옴
    import Todo from './Todo.svelte'

    // 평소할일 : 배열로 저장
    let todos: ITodo[] = [
        { id: '1e4a59703af84', text: 'Todo 1', completed: true },
        { id: '9e09bcd7b9349', text: 'Todo 2', completed: false },
        { id: '9e4273a51a37c', text: 'Todo 3', completed: false },
        { id: '53ae48bf605cc', text: 'Todo 4', completed: false },
    ]

    // 디버깅 : 변경된 값 확인 용
    $: console.log(todos)

    // 계산
    $: todosAmount = todos.length
    
    // 메서드 : 랜덤으로 숫자 생성 후 총 16자리를 생성후 자름(?) 아이디 값 생성
    function generateRandomId(): string {
        return Math.random().toString(16).slice(2)
    }

    // 이 함수는 todo라는 변수에 string만 사용 가능하게 하였습니다
    function addTodo(todo: string): void {
        let newTodo: ITodo = {
            id: generateRandomId(),
            // 상단의 타입 선언 덕분에 text는 string만 올 수 있게 되었다.
            text: todo,
            completed: false,
        }
        // 기존 배열(...todos)에 새로운 값(newTodo)을 추가
        todos = [...todos, newTodo]
    }
    
    // 이 함수는 event라는 변수에 MouseEvent만 사용 할 수 있게 하엿습니다.
    function toggleCompleted(event: MouseEvent): void{
        let {checked} = event.target as HTMLInputElement

        todos = todos.map(todo => ({
            ...todo,
            completed: checked
        }))
    }

    // 할일을 완료했을때 함수
    function completeTodo(id: string): void {
      todos = todos.map(todo => {
        if(todo.id === id){
          todo.completed = !todo.completed
        }
        return todo
      })
    }

    // 할일 목록 삭제 함수
    function removeTodo(id: string): void{
      todos = todos.filter(todo => todo.id !== id)
    }

    // 할일 목록 편집 함수
    function editTodo(id: string, newTodo: string): void {
      // 현재 할일을 가져옴
      let currentTodo = todos.findIndex((todo) => todo.id === id)
      todos[currentTodo].text = newTodo
    }
</script>

<main>
    
    <h1 class="title">스벨트 투두!</h1>

    <section class="todos">
        
        <AddTodo {addTodo} {toggleCompleted} {todosAmount} />

        <!-- 만약 투두 어마운트에 값이 있다면 -->
        {#if todosAmount}
            <ul class="todo-list">
                {#each todos as todo (todo.id)}
                  <Todo {todo} {completeTodo} {removeTodo} {editTodo} />
                {/each}
                
                <div class="actions">
                    <span class="todo-count">0 left</span>
                    <div class="filters">
                        <button class="filter">All</button>
                        <button class="filter">Active</button>
                        <button class="filter">Completed</button>
                    </div>
                    <button class="clear-completed">Clear Completed</button>
                </div>
            </ul>
        {/if}
    </section>
</main>

<style>
    /* Todos */
  
    .title {
      font-size: var(--font-80);
      font-weight: inherit;
      text-align: center;
      color: var(--color-title);
    }
  
    .todos {
      --width: 500px;
      --todos-bg: hsl(0 0% 98%);
      --todos-text: hsl(220 20% 14%);
  
      width: var(--width);
      color: var(--todos-text);
      background-color: var(--todos-bg);
      border-radius: var(--radius-base);
      border: 1px solid var(--color-gray-90);
      box-shadow: 0 0 4px var(--shadow-1);
    }
  
    .todo-list {
      list-style: none;
    }
  
    .actions {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--spacing-8) var(--spacing-16);
      font-size: 0.9rem;
      border-top: 1px solid var(--color-gray-90);
    }
  
    .actions:before {
      content: '';
      height: 40px;
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      box-shadow: 0 1px 1px hsla(0, 0%, 0%, 0.2), 0 8px 0 -3px hsl(0, 0%, 96%),
        0 9px 1px -3px hsla(0, 0%, 0%, 0.2), 0 16px 0 -6px hsl(0, 0%, 96%),
        0 17px 2px -6px hsla(0, 0%, 0%, 0.2);
      z-index: -1;
    }

  
    /* Filters */
  
    .filters {
      display: flex;
      gap: var(--spacing-4);
    }
  
    .filter {
      text-transform: capitalize;
      padding: var(--spacing-4) var(--spacing-8);
      border: 1px solid transparent;
      border-radius: var(--radius-base);
    }
  
    .filter:hover {
      border: 1px solid var(--color-highlight);
    }
  
    .selected {
      border-color: var(--color-highlight);
    }
  </style>