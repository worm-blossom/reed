import { expressions } from "macromaniajsx/jsx-runtime";
import {
Access,
  AccessStruct,
  AccessTuple,
  Application,
  ApplicationRaw,
  Bib,
  Bibliography,
  BibScope,
  BlankPattern,
  Br,
  ChoiceType,
  Cite,
  CommentLine,
  DefFunction,
  DefType,
  DefValue,
  DefVariant,
  Dfn,
  Else,
  ElseIf,
  Enum,
  Gt,
  If,
  Img,
  Interface,
  Let,
  LetRaw,
  Loc,
  Lt,
  Match,
  QualifiedMember,
  RefLoc,
  S,
  Self,
  SpliceLoc,
  Struct,
  StructDef,
  Sup,
  Tuple,
  TupleStruct,
  TupleType,
  Type,
  TypeAnnotation,
  TypeApplication,
  While,
  Wip,
} from "../deps.ts";
import { Assign } from "../deps.ts";
import {
  A,
  B,
  Code,
  Context,
  Counter,
  CssDependency,
  Def,
  Em,
  EscapeHtml,
  Expression,
  Expressions,
  FunctionItem,
  H,
  Hsection,
  JsDependency,
  Li,
  M,
  makeFigureMacro,
  makeNumberingRenderer,
  Marginale,
  MM,
  Ol,
  P,
  PreviewScope,
  Pseudocode,
  R,
  Rb,
  Rc,
  Rcb,
  ResolveAsset,
  Return,
  Rs,
  Rsb,
  Sidenote,
  Sidenotes,
  Span,
  Strong,
  Ul,
  WaitForMarginales,
} from "../deps.ts";
import { ArticleTemplate } from "./articleTemplate.tsx";
import {
  BigO,
  Curly,
  Cyan,
  Magenta,
  Mathcal,
  Mathfrak,
  MCeil,
  MFrac,
  MFunDef,
  MLog,
  MSet,
  NoWrap,
  Np,
  Orange,
  Pink,
  Quotes,
  Rank,
  TreeChild,
  TreeChildren,
  TreeItem,
} from "./macros.tsx";
import { TreeItems } from "./macros.tsx";
import { GeoDistribution } from "./macros.tsx";

const ctx = new Context();

/*
Create a custom annotation macro.
*/
function Alj(
  { children, inline }: { children?: Expressions; inline?: boolean },
): Expression {
  return (
    <Wip
      fg="#6804cc"
      bg="#ecdbfc"
      wrap={(_ctx, inner) => <>alj: {inner}</>}
      children={children}
      inline={inline}
    />
  );
}

function Cjqf(
  { children, inline }: { children?: Expressions; inline?: boolean },
): Expression {
  return (
    <Wip
      fg="#67595E" // Coffee pot
      bg="#EED6D3" // Dusty rose
      wrap={(_ctx, inner) => <>cjqf: {inner}</>} // Carson John Quentry Farmer :)
      children={children}
      inline={inline}
    />
  );
}

/*
Create macros for figures (which includes theorem-like blocks).
*/

const figureCounter = new Counter("figure-counter", 0);
const Fig = makeFigureMacro(ctx, {
  figureCounter: figureCounter,
  numberingInfo: {
    r: "Figure",
    rb: "Figure",
    rs: "Figures",
    rsb: "Figures",
    render: makeNumberingRenderer(),
  },
});

// A counter shared by several theorem-like blocks.
const thmCounter = new Counter("thm-counter", 0);

const Definition = makeFigureMacro(ctx, {
  figureCounter: thmCounter,
  numberingInfo: {
    r: "Definition",
    rb: "Definition",
    rs: "Definition",
    rsb: "Definition",
    render: makeNumberingRenderer(),
  },
  isTheoremLike: true,
});

const Example = makeFigureMacro(ctx, {
  figureCounter: thmCounter, // Shares the same counter as the `Theorem` macro.
  numberingInfo: {
    r: "Example",
    rb: "Example",
    rs: "Examples",
    rsb: "Examples",
    render: makeNumberingRenderer(),
  },
  isTheoremLike: true,
});

// Exercises are rendered as theorem-like blocks, but do not share the same counter.
const exerciseCounter = new Counter("exercise-counter", 0);

const Exercise = makeFigureMacro(ctx, {
  figureCounter: exerciseCounter, // Different counter than the `Theorem` macro.
  numberingInfo: {
    r: "Exercise",
    rb: "Exercise",
    rs: "Exercises",
    rsb: "Exercises",
    render: makeNumberingRenderer(),
  },
  isTheoremLike: true,
});

// The full input to Macromania is a single expression, which we then evaluate.
const exp = (
  <ArticleTemplate
    title={<>Reed Specification</>}
    titleId="title"
    abstract={
      <>
        <P>
          <Wip inline>TODO</Wip>
        </P>
      </>
    }
    authors={[
      {
        name: "Aljoscha Meyer",
        affiliation: "TU Berlin",
        email: "mail@aljoscha-meyer.de",
      },
    ]}
  >
    <Hsection n="introduction" title="Introduction">
      <PreviewScope>
        <P>
          <Bib item="meyer2023sok">Prefix authentication schemes</Bib> — aka append-only logs, or transparency logs — are cryptographic schemes to efficiently authenticate total ordering between events. For any two events from a single event stream, you can provide a short digest to certify that one happened before the other (as opposed to them happening concurrently). <Def n="name" r="reed">Reed</Def> is a lightweigh specification for implementing the <Bib item="meyer2023better"><M>SLLS_3</M> scheme</Bib>, a scheme that produces shorter proofs than the traditional <Bib item="laurie2021rfc">certificate transparency logs</Bib>.
        </P>
      </PreviewScope>

      <P>
        <Rb n="name"/> supersedes the earlier <A href="https://github.com/AljoschaMeyer/bamboo?tab=readme-ov-file#bamboo-">Bamboo</A> format. <Rb n="name"/> is more efficient than Bamboo, more minimalistic in feature set, and generic over any particular cryptographic primitives. Bamboo was originally designed for efficient data replication, but I have since come to prefer <A href="https://willowprotocol.org/">more flexible replication technologies</A>, so <R n="name"/> sheds its data replication origins.
      </P>
    </Hsection>

    <Hsection n="overview" title="Overview">
      <P>
        <Rb n="name"/> is a <Bib item="meyer2023sok">transitive prefix authentication scheme</Bib>: given a sequence of events, we build a directed acyclic graph (DAG) whose edges correspond to one object containing a secure hash of the other object (i.e., a Merkle-DAG). For each event, we assign a <Dfn>commitment vertex</Dfn> which has a path to the event, as well as paths to the commitment vertices of all earlier events. Given the commitment vertices of two events and the out-neighborhood of the path between them, we can reconstruct the hashes of all path vertices, thus proving that the first event did indeed happen before the other. <Rb n="name"/> guarantees that the out-neighborhoods of these paths are small, i.e., verification is efficient.
      </P>

      <P>
        Let’s break this down step by step. We start out with an ordered sequence of events, nine in the following example:
      </P>

      <P>
        These events will form the basis of a graph. To make sure that graph will give us efficient prefix authentication, we first need to add some additional vertices. You do not need to care <Em>how</Em> we determine these, we are just getting a feel for the general concepts here.
      </P>

      <P>
        Next, we add edges to turn these vertices into a useful graph. We are building a Merkle-DAG, which means that each vertex is labeled with a secure hash of the concatenation of the labels of its <Sidenote note={<>This is a slight oversimplification, <R n="name"/> proper also concatenates some metadata into the labels.</>}>out-neighbors</Sidenote>. We need not draw the labels, since they are derived deterministically from the structure of the graph.
      </P>

      <P>
        In this graph, each event has a corresponding commitment vertex. As you can see, each event is reachable from its comittment vertex, and each commitment vertex is reachable from the commitment vertices of all later events.
      </P>

      <P>
        To illustrate prefix authentication, we now arbitrarily select two events and highlight the path between their commitment vertices.
      </P>

      <P>
        Given the (labels of the) out-neighborhood of that path, we can reconstruct the label of the greater commitment vertex.
      </P>

      <P>
        If the hash function we used is secure, then it is computationally infeasable to provide labels that allow reconstructing the path between two vertices — unless there actually <Em>is</Em> a path from which we can simply look up the labels. Hence, the labels of the out-neighborhood of the path serve as an unforgeable proof that event <M>2</M> happened before event <M>8</M>. Neat!
      </P>
    </Hsection>

    <Hsection n="spec" title="Specification">
      <PreviewScope>
        <P>
          We assume <DefFunction n="hash"/> to be a secure hash function that maps arbitrary bytestrings to fixed-with bytestrings. We call an output of <R n="hash"/> a <Def n="digest"/>.
        </P>
      </PreviewScope>

      <PreviewScope>
        <P>
          We define everything in terms of a sequence <DefValue n="events"/> of <Rs n="event"/>, where an <Def n="event" rs="events"/> is an arbitrary bytestring. The sequence <R n="events"/> must have a <DefValue n="length"/> between one and <M post=",">2^<Curly>64</Curly> - 1</M> both inclusive. We number <Rs n="event"/> starting at <M post=",">1</M> because the math ends up much nicer that way.
        </P>
      </PreviewScope>

      <PreviewScope>
        <P>
          The set <DefType n="InnerVertices"/> is the set of all pairs <M>(<DefValue n="x"/>, <DefValue n="y"/>)</M> such that <NoWrap><M>1 \leq <R n="x"/> \leq <R n="length"/></M></NoWrap> and <M>3^<Curly><R n="y"/></Curly></M> divides <R n="x"/>.
        </P>
      </PreviewScope>

      <PreviewScope>
        <P>
          Let <M>(<DefValue n="x2" r="x"/>, <DefValue n="y2" r="y"/>)</M> be in <R n="InnerVertices"/> such that <M>(<R n="x2"/>, <R n="y2"/> + 1)</M> is <Em>not</Em> in <R n="InnerVertices"/>. Then we call <M>(<R n="x2"/>, <R n="y2"/>)</M> the <Def n="commitment" r="commitment vertex"/> of <R n="event"/> <R n="x2"/>.
        </P>
      </PreviewScope>

      <PreviewScope>
        <P>
          Let <M>(<DefValue n="x3" r="x"/>, <DefValue n="y3" r="y"/>)</M> be in <R n="InnerVertices"/>. The <Def n="predecessor" r="predecessor vertex" rs="predecessor vertices"/> of <M>(<R n="x3"/>, <R n="y3"/>)</M> is the <R n="event"/> <R n="x3"/> if <M><R n="y3"/> = 0</M>, or the inner vertex <M>(<R n="x3"/>, <R n="y3"/> - 1)</M>, otherwise.
        </P>
      </PreviewScope>

      <PreviewScope>
        <P>
          Let <M>(<DefValue n="x4" r="x"/>, <DefValue n="y4" r="y"/>)</M> be in <R n="InnerVertices"/>, with <M post="."><R n="x4"/> \geq 2</M> The <Def n="jump" r="jump vertex" rs="jump vertices"/> of <M>(<R n="x4"/>, <R n="y4"/>)</M> is the <R n="commitment"/> of <R n="event"/> <M post="."><R n="x4"/> - 3^<Curly><R n="y4"/></Curly></M>
        </P>
      </PreviewScope>

      <PreviewScope>
        <P>
          The <DefFunction n="label"/> of an <R n="event"/> <DefValue n="label_event" r="e"/> is the <R n="hash"/> of the concatenation of<Ul>
            <Li>the byte <Code>0x00</Code>, and</Li>
            <Li><R n="label_event"/>.</Li>
          </Ul>
        </P>
        <P>
          The <DefFunction n="label" fake/> of an inner vertex <M><DefValue n="label_v" r="v"/> := (<DefValue n="x5" r="x"/>, <DefValue n="y5" r="y"/>)</M> is the <R n="hash"/> of the concatenation of<Ul>
            <Li>the byte <Code>0x01</Code>,</Li>
            <Li>the <R n="label"/> of the <R n="predecessor"/> of <R n="label_v"/>,</Li>
            <Li>the <R n="label"/> of the <R n="jump"/> of <R n="label_v"/>,</Li>
            <Li>the big-endian encoding of <R n="x5"/> as an unsigned 64-bit integer, and</Li>
            <Li>the encoding of <R n="y5"/> as an unsigned 8-bit integer.</Li>
          </Ul>
        </P>
      </PreviewScope>
    </Hsection>
  </ArticleTemplate>
);

// Evaluate the expression. This has exciting side-effects,
// like creating a directory that contains a website!
ctx.evaluate(exp);

/*
what, why (link), sync/nb/nb_send, basics: producer-buffered-bulk, consumer-buffered-bulk, piping, wrappers, feature flags, queues, converters
*/