import { useContext } from 'react'
import { Workspace } from 'resource-workspace-rcl'
import { makeStyles } from '@material-ui/core/styles'
import ResourceCard from '@components/ResourceCard'
import ScriptureCard from '@components/ScriptureCard'
import { ReferenceContext } from '@context/ReferenceContext'
import {
  NT_BOOKS,
  NT_ORIG_LANG,
  OT_ORIG_LANG,
  NT_ORIG_LANG_BIBLE,
  OT_ORIG_LANG_BIBLE,
} from '@common/BooksOfTheBible'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    margin: '0 1px !important',
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
  },
  dragIndicator: {},
}))

function WorkspaceContainer() {
  const classes = useStyles()
  const {
    state: {
      owner,
      server,
      branch,
      taArticle,
      languageId,
      scriptureOwner,
      bibleReference: { bookId, chapter, verse },
    },
    actions: { updateTaDetails },
  } = useContext(ReferenceContext)

  const layout = {
    widths: [
      [1, 1, 1],
      [2, 2],
      [2, 2],
    ],
    heights: [[1.6], [3.5, 3.5], [3.5, 3.5]],
  }

  // select original language Bible based on which testament the book is
  const isNewTestament = NT_BOOKS.includes(bookId)
  const originalLanguageID = isNewTestament ? NT_ORIG_LANG : OT_ORIG_LANG
  const originalBibleID = isNewTestament
    ? NT_ORIG_LANG_BIBLE
    : OT_ORIG_LANG_BIBLE

  return (
    <Workspace
      rowHeight={100}
      layout={layout}
      gridMargin={[15, 15]}
      classes={classes}
    >
      <ScriptureCard
        title='Scripture'
        classes={classes}
        chapter={chapter}
        verse={verse}
        server={server}
        owner={scriptureOwner}
        branch={branch}
        languageId={languageId}
        resourceId={'ult'}
        bookId={bookId}
        disableWordPopover={true}
      />

      <ScriptureCard
        title='Scripture'
        classes={classes}
        chapter={chapter}
        verse={verse}
        server={server}
        owner={scriptureOwner}
        branch={branch}
        languageId={originalLanguageID}
        resourceId={originalBibleID}
        bookId={bookId}
      />

      <ScriptureCard
        title='Scripture'
        classes={classes}
        chapter={chapter}
        verse={verse}
        server={server}
        owner={scriptureOwner}
        branch={branch}
        languageId={languageId}
        resourceId={'ust'}
        bookId={bookId}
        disableWordPopover={true}
      />

      <ResourceCard
        title='translationNotes'
        classes={classes}
        chapter={chapter}
        verse={verse}
        server={server}
        owner={owner}
        branch={branch}
        languageId={languageId}
        resourceId={'tn'}
        projectId={bookId}
        filePath={null}
        updateTaDetails={updateTaDetails}
      />
      <ResourceCard
        title='translationAcademy'
        classes={classes}
        chapter={chapter}
        verse={verse}
        server={server}
        owner={owner}
        branch={branch}
        languageId={languageId}
        resourceId={'ta'}
        projectId={taArticle?.projectId}
        filePath={taArticle?.filePath}
      />
      <ResourceCard
        title='translationWords'
        classes={classes}
        chapter={chapter}
        verse={verse}
        server={server}
        owner={owner}
        branch={branch}
        viewMode={'markdown'}
        languageId={languageId}
        resourceId={'twl'}
        projectId={bookId}
        filePath={null}
      />
      <ResourceCard
        title='translationQuestions'
        classes={classes}
        chapter={chapter}
        verse={verse}
        server={server}
        owner={owner}
        branch={branch}
        languageId={languageId}
        resourceId={'tq'}
        projectId={bookId}
        filePath={null}
      />
    </Workspace>
  )
}

export default WorkspaceContainer
