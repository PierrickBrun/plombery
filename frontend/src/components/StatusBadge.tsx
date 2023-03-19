import { Badge } from '@tremor/react'

import { PipelineRunStatus } from '@/types'
import { STATUS_COLORS, STATUS_ICONS } from '@/utils'

interface Props {
  status: PipelineRunStatus
}

const StatusBadge: React.FC<Props> = ({ status }) => (
  <Badge
    text={status}
    color={STATUS_COLORS[status]}
    icon={STATUS_ICONS[status]}
  />
)

export default StatusBadge
