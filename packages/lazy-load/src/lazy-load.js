/* eslint-env browser */
import { Component } from "react";
import PropTypes from "prop-types";

class LazyLoad extends Component {
  constructor(props) {
    super(props);

    this.pending = new Set();
    this.pendingTimer = null;
    this.state = {
      clientHasRendered: false,
      isObserving: false,
      nodes: new Map()
    };
    this.registerNode = this.registerNode.bind(this);

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    this.state.isObserving = true;

    const options = {
      rootMargin: props.rootMargin,
      threshold: props.threshold
    };

    this.observer = new window.IntersectionObserver(
      this.handleObservation.bind(this),
      options
    );
  }

  componentDidMount() {
    const newState = {
      clientHasRendered: true
    };

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState(newState);
  }

  componentWillUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }

    clearTimeout(this.pendingTimer);

    this.pending.clear();
  }

  handleObservation(entries) {
    entries.forEach(({ target, intersectionRatio }) => {
      if (
        intersectionRatio >= this.props.threshold &&
        !this.state.nodes.get(target.id)
      ) {
        this.pending.add(target);
      } else if (
        intersectionRatio < this.props.threshold &&
        this.pending.has(target)
      ) {
        this.pending.delete(target);
      }
    });

    if (this.pending.size) {
      clearTimeout(this.pendingTimer);

      this.pendingTimer = setTimeout(() => {
        if (!this.pending.size) {
          return;
        }

        const newNodes = new Map();

        this.pending.forEach(node => newNodes.set(node.id, node));

        this.setState({
          nodes: new Map([...this.state.nodes, ...newNodes])
        });

        this.pending.clear();
      }, 100);
    }
  }

  registerNode(node) {
    if (!node || !this.observer) {
      return;
    }

    this.observer.observe(node);
  }

  render() {
    return this.props.children({
      clientHasRendered: this.state.clientHasRendered,
      observed: this.state.nodes,
      registerNode: this.registerNode,
      isObserving: this.state.isObserving
    });
  }
}

LazyLoad.propTypes = {
  children: PropTypes.func.isRequired,
  rootMargin: PropTypes.string,
  threshold: PropTypes.number
};

LazyLoad.defaultProps = {
  rootMargin: "0px",
  threshold: 0
};

export default LazyLoad;
