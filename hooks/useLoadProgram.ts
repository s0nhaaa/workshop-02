import { IDL, Proop } from '@/configs/proop'
import * as anchor from '@project-serum/anchor'
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import { useMemo } from 'react'

export default function useLoadProgram(id: string) {
  const wallet = useAnchorWallet()
  const { connection } = useConnection()

  const programID = useMemo(() => new PublicKey(id), [id])

  const program = useMemo(() => {
    if (wallet) {
      const provider = new anchor.AnchorProvider(connection, wallet, anchor.AnchorProvider.defaultOptions())
      return new anchor.Program<Proop>(IDL, programID, provider)
    }
  }, [programID, wallet, connection])

  return {
    programID,
    program,
  }
}
