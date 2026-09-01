/* eslint-disable */
import { promisify } from 'node:util'
import { execFile } from 'node:child_process'

const pollString = [
  '192.168.50.46',
  '-a',
  '1',
  '-r',
  '1',
  '-c',
  '2',
  '-p',
  '502',
  '-t',
  '4',
  '-x',
  '-1',
]

const registerVoltage = {
  status: 'pending',
  variable: 'V L-N',
  physicalAddress: '0x0000',
  pollAddress: '1',
  dataFormat: 'int32',
  weight: '10',
  success: {
    raw: [],
  },
  error: {
    raw: '',
  },
}

const execFilePromise = promisify(execFile)

const pollData = async () => {
  const { stdout, stderr } = await execFilePromise('mbpoll', pollString)

  const regexp = /\[0x(\w+)\]:\s*(-?\d+)/g
  let matches = [...stdout.matchAll(regexp)]
  for (const match of matches) {
    Object.entries(registerVoltage.success.raw.push(match[2]))
  }
  handleInt32(registerVoltage)
}
const handleInt32 = (data) => {
  console.log(data.success.raw)
}
pollData()
