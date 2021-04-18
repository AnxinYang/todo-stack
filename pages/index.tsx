import { useStore, If } from 'ax-react-lib'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import Form from '../components/form'
import { Input } from '../components/Input'
import styles from '../styles/Home.module.css'

export default function Home() {


  return (
    <div className={styles.container}>
      <NewTask />

      <Tasks />
    </div>
  )
}


function NewTask() {
  const [tasks, setTasks] = useStore('tasks', [])
  const [task, setTask] = useState('');
  const [detail, setDetail] = useState(false)

  return (
    <section className={styles.newTaskSection}>
      <Form onSubmit={(data) => {

      }}>
        <Input
          name='title'
          value={task}
          onChange={setTask}
          className={styles.newTaskInput}
          placeholder='New Task'
          // required
          onKeyPress={(value, e) => {
            if (e.shiftKey && e.key === 'Enter') {
              setDetail(true)
              return
            }
            if (!detail && e.key === 'Enter') {
              const title: string = value.trim()
              setTask('')
              if (!title) return;
              setTasks([{
                title: title,
                done: false,
                ts: Date.now()
              }, ...tasks]);
            }
          }}
        />

        <p>Press Enter to create a task. Press Shift+Enter to create a task with detail </p>

        {/* <If condition={detail}>
          <br />
          <Input name='desc' value={desc} onChange={setDesc} className={styles.newTaskInput} placeholder='Description' />
          <br />
          <button>Create</button>
        </If> */}
      </Form>
    </section  >
  )
}

function Tasks() {
  const [tasks] = useStore('tasks', [])


  return (
    <section className={styles.tasksSection}>
      {tasks.map((task) => {
        return <Task key={task.title + task.ts} data={task} />
      })}
    </section>
  )
}



function Task(props) {
  return (
    <div className={styles.taskCard}>
      <strong>{props.data.title}</strong>
      <span>{new Date(props.data.ts).toLocaleString()}, {props.data.desc ?? 'No Description'}</span>
    </div>
  )
}