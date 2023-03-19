import { useQuery } from '@tanstack/react-query'
import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Title,
  Badge,
  Flex,
} from '@tremor/react'
import { Link } from 'react-router-dom'
import React from 'react'
import { listPipelines } from '../repository'

import { Pipeline } from '../types'
import { formatDateTime } from '../utils'
import ManualRunDialog from './ManualRunDialog'

interface TriggersListProps {
  pipeline: Pipeline
}

const TriggersList: React.FC<TriggersListProps> = ({ pipeline }) => (
  <Card marginTop="mt-5">
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Interval</TableHeaderCell>
          <TableHeaderCell>Next fire time</TableHeaderCell>
          <TableHeaderCell>Latest Status</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {pipeline.triggers.map((trigger) => (
          <TableRow key={trigger.id}>
            <TableCell>
              <Link to={`/pipelines/${pipeline.id}/triggers/${trigger.id}`}>
                {trigger.name}
              </Link>
            </TableCell>
            <TableCell>
              <Text>{trigger.interval}</Text>
            </TableCell>
            <TableCell>
              {trigger.paused ? (
                <Badge
                  text="Disabled"
                  color="amber"
                  tooltip="Re-enable the trigger setting paused=False"
                  size="xs"
                />
              ) : (
                formatDateTime(trigger.next_fire_time)
              )}
            </TableCell>
            <TableCell>
              -
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Card>
)

const PipelinesList: React.FC = () => {
  const query = useQuery({
    queryKey: ['pipelines'],
    queryFn: listPipelines,
    initialData: [],
  })

  if (query.isLoading) return <div>Loading...</div>

  if (query.error) return <div>An error has occurred</div>

  const pipelines = query.data

  return (
    <>
      {pipelines.map((pipeline) => (
        <React.Fragment key={pipeline.id}>
          <Flex>
            <Flex justifyContent="justify-start" spaceX="space-x-2">
              <Title>{pipeline.name}</Title>
              <Text>
                <span className="tr-block tr-truncate tr-max-w-lg">
                  {pipeline.description}
                </span>
              </Text>
            </Flex>

            <ManualRunDialog pipeline={pipeline} />
          </Flex>
          <TriggersList pipeline={pipeline} />
        </React.Fragment>
      ))}
    </>
  )
}

export default PipelinesList
