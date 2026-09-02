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
    rawDec: [],
    value: Number(),
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
    Object.entries(registerVoltage.success.rawDec.push(match[2]))
  }

  decodeInt32(registerVoltage)
}

const decodeInt32 = (register) => {
  const [firstInt16, secondInt16] = register.success.rawDec.map(Number)
  const value = firstInt16 + secondInt16 * 65536
  const valueDec = value >= 2147483648 ? value - 4294967296 : value
  const voltage = valueDec / register.weight

  register.success.value = voltage
  console.log(register)
}

pollData()
