import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadImages } from '../../actions';
import Button from '../Button';
import Stats from '../Stats/Stats';
import './styles.css';

class ImageGrid extends Component {
    componentDidMount() {
        this.props.loadImages();
    }

    render() {
        const { error, isLoading, loadImages, imageStats } = this.props;
        const images = [].concat(...this.props.images);
        return (
            <div className="content">
                <section className="grid">
                    {images.map(image => (
                        <div
                            key={image.id}
                            className={`item item-${Math.ceil(
                                image.height / image.width,
                            )}`}
                        >
                            <Stats stats={imageStats[image.id]} />
                            <img
                                src={image.urls.small}
                                alt={image.user.username}
                            />
                        </div>
                    ))}
                </section>
                {error && <div className="error">{JSON.stringify(error)}</div>}
                <Button
                    onClick={() => !isLoading && loadImages()}
                    loading={isLoading}
                >
                    Load More
                </Button>
            </div>
        );
    }
}

const mapStateToProps = ({ isLoading, images, error, imageStats }) => ({
    isLoading,
    images,
    imageStats,
    error,
});

const mapDispatchToProps = dispatch => ({
    loadImages: () => dispatch(loadImages()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ImageGrid);
